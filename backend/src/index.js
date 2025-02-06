const express = require("express");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8000;

// app.use(express.bodyParser());
app.use(express.json());

// app.use("/static", express.static(path.join(__dirname, "public")));
// let connectedClients = [];
const connections = {
  camera_1: { port: 8887, clients: [] },
  camera_2: { port: 8888, clients: [] },
  camera_3: { port: 8889, clients: [] },
};
// Clients
// const wss = new WebSocket.Server({port: '8999'}, () => console.log(`WS Server is listening at 8999`));
// wss.on('connection', ws => {
// 	ws.on('message', data => {
// 		if (ws.readyState !== ws.OPEN) return;
// 		connectedClients.push(ws);
// 	});
// });

// Sensors
Object.entries(connections).forEach(([cameraId, settings]) => {
  const wss = new WebSocket.Server({ port: settings.port }, () =>
    console.log(`WS Server for ${cameraId} running on port ${settings.port}`)
  );

  wss.on("connection", (ws) => {
    console.log(`✅ ${cameraId} connected!`);
    settings.clients.push(ws);

    ws.on("message", (data) => {
      if (ws.readyState !== ws.OPEN) return;

      console.log("Received image data: ", data);

      // Save the binary data (image) as a .jpg file
      const fileName = `image_${Date.now()}.jpg`; // Unique file name based on timestamp
      const filePath = path.join(__dirname, fileName);

      // Write the binary data to a file
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.error("Error saving the image:", err);
        } else {
          console.log(`Image saved to ${filePath}`);
        }
      });
      //   connection.image = Buffer.from(Uint8Array.from(data)).toString("base64");
    });

    ws.on("close", () => {
      console.log(`⚠️ ${cameraId} disconnected.`);
      settings.clients = settings.clients.filter((client) => client !== ws);
    });
  });
});
// app.get("/client", (_req, res) => {
//   res.sendFile(path.resolve(__dirname, "./public/client.html"));
// });

function sendCommandToESP(cameraId, command) {
  if (connections[cameraId] && connections[cameraId].clients.length > 0) {
    connections[cameraId].clients.forEach((client) => client.send(command));
    console.log(`Sent "${command}" to ${cameraId}`);
  } else {
    console.log(`No active connection for ${cameraId}`);
  }
}

app.post("/:cameraId", (req, res) => {
  console.log(JSON.stringify(req.body));
  const { cameraId, command } = req.body;
  sendCommandToESP(cameraId, command);
  res.send(`${command} command sent to ${cameraId}!`);
});

app.get("/up/:cameraId", (req, res) => {
  const cameraId = req.params.cameraId;
  sendCommandToESP(cameraId, "UP");
  res.send(`Capture command sent to ${cameraId}!`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
