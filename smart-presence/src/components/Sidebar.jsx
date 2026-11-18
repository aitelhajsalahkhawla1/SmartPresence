import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarDays,
  ClipboardCheck,
  QrCode,
  FileText,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <QrCode size={30} />
        <h2>SmartPresence</h2>
      </div>

      <p className="sidebar-title">MENU PRINCIPAL</p>

      {/* MENU */}
      <nav className="sidebar-nav">

        <NavLink to="/" end className="sidebar-link">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/students" className="sidebar-link">
          <Users size={20} />
          <span>Étudiants</span>
        </NavLink>

        <NavLink to="/formateurs" className="sidebar-link">
          <GraduationCap size={20} />
          <span>Formateurs</span>
        </NavLink>

        <NavLink to="/classes" className="sidebar-link">
          <Users size={20} />
          <span>Classes</span>
        </NavLink>

        <NavLink to="/seances" className="sidebar-link">
          <CalendarDays size={20} />
          <span>Séances</span>
        </NavLink>

        <NavLink to="/scanner" className="sidebar-link">
          <QrCode size={20} />
          <span>Scanner QR</span>
        </NavLink>

        <NavLink to="/presences" className="sidebar-link">
          <ClipboardCheck size={20} />
          <span>Présences</span>
        </NavLink>

        <NavLink to="/rapports" className="sidebar-link">
          <FileText size={20} />
          <span>Rapports</span>
        </NavLink>

      </nav>

      {/* BOTTOM MENU */}
      <div className="sidebar-bottom">

        <NavLink to="/profil" className="sidebar-link">
          <UserCircle size={20} />
          <span>Profil</span>
        </NavLink>

        <NavLink to="/parametres" className="sidebar-link">
          <Settings size={20} />
          <span>Paramètres</span>
        </NavLink>

        {/* LOGOUT */}
        <button
          type="button"
          className="sidebar-link logout-button"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>

      </div>

    </aside>
  );
}