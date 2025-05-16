import { BrowserRouter, Routes, Route } from "react-router-dom";

import Parking from "./components/parking.component";
import Parking2 from "./components/parking2.component";

import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page"


function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}

          <Route path="/parking2" element={<Parking2 />} />

          <Route path="/parking" element={<Parking />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;