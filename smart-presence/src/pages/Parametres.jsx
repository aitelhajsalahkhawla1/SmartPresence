import React, { useState } from "react";
import { Settings, Bell, Lock, Globe } from "lucide-react";

export default function Parametres() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    language: "Français"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Paramètres enregistrés !");
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Paramètres</h1>
          <p>Gérez les préférences de votre application.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-card">

        <div className="settings-section">
          <div className="settings-heading">
            <Bell size={22} />
            <div>
              <h3>Notifications</h3>
              <p>Gérer les notifications de l'application.</p>
            </div>
          </div>

          <label className="setting-option">
            <span>Activer les notifications</span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: e.target.checked
                })
              }
            />
          </label>

          <label className="setting-option">
            <span>Alertes par email</span>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailAlerts: e.target.checked
                })
              }
            />
          </label>
        </div>

        <div className="settings-section">
          <div className="settings-heading">
            <Globe size={22} />
            <div>
              <h3>Langue</h3>
              <p>Choisissez la langue de l'application.</p>
            </div>
          </div>

          <select
            value={settings.language}
            onChange={(e) =>
              setSettings({
                ...settings,
                language: e.target.value
              })
            }
          >
            <option>Français</option>
            <option>العربية</option>
            <option>English</option>
          </select>
        </div>

        <div className="settings-section">
          <div className="settings-heading">
            <Lock size={22} />
            <div>
              <h3>Sécurité</h3>
              <p>Les paramètres de sécurité seront disponibles prochainement.</p>
            </div>
          </div>
        </div>

        <button type="submit" className="settings-save">
          <Settings size={18} />
          Enregistrer les paramètres
        </button>

      </form>
    </div>
  );
}