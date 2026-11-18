import React, { useState } from "react";
import { User, Mail, Phone, Briefcase, Save } from "lucide-react";

export default function Profil() {
  const [profile, setProfile] = useState({
    name: "Admin SmartPresence",
    email: "admin@smartpresence.com",
    phone: "0600000000",
    role: "Administrateur"
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profil modifié avec succès !");
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>Mon Profil</h1>
          <p>Gérez vos informations personnelles.</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <User size={45} />
        </div>

        <h2>{profile.name}</h2>
        <p>{profile.role}</p>

        <form onSubmit={handleSubmit}>
          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Nom complet</label>
              <div className="profile-input">
                <User size={18} />
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="profile-field">
              <label>Email</label>
              <div className="profile-input">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="profile-field">
              <label>Téléphone</label>
              <div className="profile-input">
                <Phone size={18} />
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="profile-field">
              <label>Rôle</label>
              <div className="profile-input">
                <Briefcase size={18} />
                <input
                  type="text"
                  value={profile.role}
                  disabled
                />
              </div>
            </div>
          </div>

          <button type="submit" className="profile-save">
            <Save size={18} />
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}