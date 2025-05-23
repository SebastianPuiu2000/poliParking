const express = require("express");
const { spawn } = require("child_process");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const port = 8000;

// app.use(express.bodyParser());
app.use(express.json());

// app.use("/static", express.static(path.join(__dirname, "public")));
// let connectedClients = [];
const connections = {
  // camera_1: { port: 8887, clients: [] }, // entrance
  // camera_2: { port: 8888, clients: [] }, // exit
  // camera_3: { port: 8889, clients: [] }, // top
  // servo_1: { port: 8890, clients: [] }, // entrance
  // servo_2: { port: 8891, clients: [] }, // exit
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
// Object.entries(connections).forEach(([deviceId, settings]) => {
//   const wss = new WebSocket.Server(
//     {
//       port: settings.port,
//       // perMessageDeflate: false,
//       // handleProtocols: () => false,
//     },
//     () =>
//       console.log(`WS Server for ${deviceId} running on port ${settings.port}`)
//   );

//   wss.on("connection", (ws) => {
//     console.log(`✅ ${deviceId} connected!`);
//     settings.clients.push(ws);

//     ws.on("message", (data) => {
//       if (ws.readyState !== ws.OPEN) return;

//       console.log("Received image data: ", data);

//       // Save the binary data (image) as a .jpg file
//       const fileName = `${deviceId}_image_${Date.now()}.jpg`; // Unique file name based on timestamp
//       const filePath = path.join(__dirname, deviceId, fileName);

//       // Write the binary data to a file
//       fs.writeFile(filePath, data, (err) => {
//         if (err) {
//           console.error("Error saving the image:", err);
//         } else {
//           console.log(`Image saved to ${filePath}`);
//         }
//       });
//       //   connection.image = Buffer.from(Uint8Array.from(data)).toString("base64");
//     });

//     ws.on("close", () => {
//       console.log(`⚠️ ${deviceId} disconnected.`);
//       settings.clients = settings.clients.filter((client) => client !== ws);
//     });
//   });
// });

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

const camColors = {
  camera_1: colors.green,
  camera_2: colors.cyan,
};

function log(camName, msg) {
  const color = camColors[camName] || colors.reset;
  console.log(`${color}[${camName}] ${msg}${colors.reset}`);
}

const CAMS = [
  { name: "camera_1", url: "ws://192.168.1.157:8888/" },
  { name: "camera_2", url: "ws://192.168.1.121:8888/" },
];

// Connect to both ESP32 WebSocket servers
function connectToCam(cam) {
  let ws;
  let pingTimeout;
  const dir = path.join(__dirname, cam.name);

  const connect = () => {
    log(cam.name, `🔌 Connecting to ${cam.url}`);
    ws = new WebSocket(cam.url);

    function heartbeat() {
      clearTimeout(pingTimeout);
      pingTimeout = setTimeout(() => {
        log(cam.name, "💔 No data for 10s. Terminating connection...");
        ws.terminate(); // triggers 'close'
      }, 60000);
    }

    ws.on("open", () => {
      log(cam.name, "✅ Connected to ESP32");
      heartbeat();
    });

    ws.on("message", (data, isBinary) => {
      heartbeat();

      const fileName = `image_${Date.now()}.jpg`; // Unique file name based on timestamp
      const filePath = path.join(dir, fileName);

      fs.writeFile(filePath, data, (err) => {
        if (err) {
          log(cam.name, `❌ Error saving image: ${err.message}`);
        } else {
          log(cam.name, `💾 Saved ${fileName}`);
        }
      });
    });

    ws.on("close", () => {
      log(cam.name, "🔁 Disconnected. Reconnecting in 5s...");
      clearTimeout(pingTimeout);
      setTimeout(connect, 5000);
    });

    ws.on("error", (err) => {
      log(cam.name, `❌ WebSocket error: ${err.message}`);
      ws.close(); // triggers 'close'
    });
  };

  connect();
}

// Start both connections
CAMS.forEach(connectToCam);

// const ESP32_WS_URL = "ws://192.168.1.157:8888/";
// let esp32Data = null;
// let ws;
// let pingTimeout;

// function connectToESP32(esp_ws_url) {
//   console.log("Connecting to ESP32...");
//   ws = new WebSocket(esp_ws_url);

//   const heartbeat = () => {
//     clearTimeout(pingTimeout);

//     // If no ping in 5 seconds, reconnect
//     pingTimeout = setTimeout(() => {
//       console.log("💔 ESP32 heartbeat lost. Reconnecting...");
//       ws.terminate(); // Force close
//     }, 10000);
//   };

//   ws.on("open", () => {
//     heartbeat();
//     console.log(`✅ Connected to ESP32 on ${esp_ws_url}`);
//   });

//   ws.on("message", (data, isBinary) => {
//     heartbeat();

//     console.log("📷 Image data received");

//     const fileName = `image_${Date.now()}.jpg`; // Unique file name based on timestamp
//     const filePath = path.join(__dirname, "camera_1", fileName);

//     // Write the binary data to a file
//     fs.writeFile(filePath, data, (err) => {
//       if (err) {
//         console.error("Error saving the image:", err);
//       } else {
//         console.log(`Image saved to ${filePath}`);
//       }
//     });
//     //   connection.image = Buffer.from(Uint8Array.from(data)).toString("base64");
//   });

//   ws.on("close", () => {
//     console.log("🔁 ESP32 disconnected. Reconnecting in 10s...");
//     clearTimeout(pingTimeout);
//     setTimeout(connectToESP32, 10000);
//   });

//   ws.on("error", (err) => {
//     console.error("❌ WebSocket error:", err.message);
//     ws.close();
//   });
// }

// connectToESP32(ESP32_WS_URL);

function sendCommandToESP(deviceId, command) {
  if (connections[deviceId] && connections[deviceId].clients.length > 0) {
    connections[deviceId].clients.forEach((client) => client.send(command));
    console.log(`Sent "${command}" to ${deviceId}`);
  } else {
    console.log(`No active connection for ${deviceId}`);
  }
}

app.post("/up/:deviceId", (req, res) => {
  const deviceId = req.params.deviceId;
  // sendCommandToESP(deviceId, "U");
  res.send(`Capture command sent to ${deviceId}!`);
});

app.post("/down/:deviceId", (req, res) => {
  const deviceId = req.params.deviceId;
  // sendCommandToESP(deviceId, "D");
  res.send(`Capture command sent to ${deviceId}!`);
});

// app.post("/:deviceId", (req, res) => {
//   console.log(JSON.stringify(req.body));
//   const { deviceId, command } = req.body;
//   sendCommandToESP(deviceId, command);
//   res.send(`${command} command sent to ${deviceId}!`);
// });

// app.get("/up/:deviceId", (req, res) => {
//   const deviceId = req.params.deviceId;
//   sendCommandToESP(deviceId, "UP");
//   res.send(`Capture command sent to ${deviceId}!`);
// });

app.get("/parking", (req, res) => {
  const python = spawn("python3", ["./python/main.py"]);

  let dataBuffer = "";

  python.stdout.on("data", (data) => {
    dataBuffer += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("close", (code) => {
    try {
      const result = JSON.parse(dataBuffer);
      console.log("Received list from Python:", result); // e.g., [1, 0, 1, 1, 0]
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });

  res.status(200).send(`Image generated!`);
});

app.get("/plate", (req, res) => {
  const python = spawn("python3", ["./plate_processing/main.py"]);

  let dataBuffer = "";

  python.stdout.on("data", (data) => {
    dataBuffer += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("close", (code) => {
    try {
      const result = JSON.parse(dataBuffer);
      console.log("Received list from Python:", result); // e.g., [1, 0, 1, 1, 0]

      // TODO: maybe remove first letter (it might be the country)
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });

  res.status(200).send(`Image generated!`);
});

// ESP32 camera IPs
// const cameras = [
//   { name: "camera_1", url: "http://192.168.1.155/capture" },
//   // { name: "camera_2", url: "http://192.168.1.156/capture" },
// ];

// // Poll each ESP32 every 10 seconds
// async function pollCameras() {
//   for (const cam of cameras) {
//     try {
//       const res = await fetch(cam.url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const buffer = await res.buffer();

//       const fileName = `image_${Date.now()}.jpg`; // Unique file name based on timestamp
//       const filePath = path.join(__dirname, cam.name, fileName);

//       fs.writeFileSync(filePath, buffer);
//       console.log(`Saved image: ${fileName}`);
//     } catch (err) {
//       console.error(`Error fetching from ${cam.name}:`, err.message);
//     }
//   }
// }

// // Start polling
// setInterval(pollCameras, 7000);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
