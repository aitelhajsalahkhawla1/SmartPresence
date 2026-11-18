
import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="search-box">
        <Search size={20} />
        <input type="text" placeholder="Rechercher..." />
      </div>

      <div className="navbar-right">
        <button className="notification">
          <Bell size={21} />
          <span></span>
        </button>

        <div className="admin-profile">
          <div className="avatar">A</div>
          <div>
            <h4>Admin</h4>
            <p>Administrateur</p>
          </div>
          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
