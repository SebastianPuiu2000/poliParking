import { BrowserRouter, Routes, Route } from "react-router-dom";

import Parking from "./components/parking.component";
import Parking2 from "./components/parking2.component";

import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page"
import MenuPage from "./pages/menu.page"
import ParkingsPage from "./pages/parkings.page"
import HistoryPage from "./pages/history.page"
import SettingsPage from "./pages/settings.page"

import NavbarComponent from "./components/navbar.component"


function App() {
  return (

    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
        <NavbarComponent></NavbarComponent>
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<Main />} /> */}
            {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}

            <Route path="/parking2" element={<Parking2 />} />

            <Route path="/parking" element={<Parking />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/menu" element={<MenuPage />} />
            <Route path="/parkings" element={<ParkingsPage />} />
            <Route path="/history" element={<HistoryPage />} />

            <Route path="/settings" element={<SettingsPage />} />



          </Routes>
        </main>
        <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <div className="max-w-7xl mx-auto">
            <p>© 2023 ParkingApp. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter >

  );
}

export default App;