import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Formateurs from "./pages/Formateurs";
import Classes from "./pages/Classes";
import Seances from "./pages/Seances";
import Scanner from "./pages/Scanner";
import Presences from "./pages/Presences";
import Rapports from "./pages/Rapports";
import Profil from "./pages/Profil";
import Parametres from "./pages/Parametres";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />

              <main className="main-content">
                <Navbar />

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/formateurs" element={<Formateurs />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/seances" element={<Seances />} />
                  <Route path="/scanner" element={<Scanner />} />
                  <Route path="/presences" element={<Presences />} />
                  <Route path="/rapports" element={<Rapports />} />
                  <Route path="/profil" element={<Profil />} />
                  <Route path="/parametres" element={<Parametres />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;