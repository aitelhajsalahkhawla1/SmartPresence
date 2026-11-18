
import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, CalendarDays } from "lucide-react";

export default function Seances() {
  const [seances, setSeances] = useState([
    {
      id: 1,
      title: "Introduction React",
      classe: "DD104",
      formateur: "Ahmed Karimi",
      date: "2026-11-19",
      start: "09:00",
      end: "11:00",
      status: "Planifiée",
    },
    {
      id: 2,
      title: "Base de données",
      classe: "DD105",
      formateur: "Fatima Zahra",
      date: "2026-11-20",
      start: "14:00",
      end: "16:00",
      status: "Terminée",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    title: "",
    classe: "",
    formateur: "",
    date: "",
    start: "",
    end: "",
    status: "Planifiée",
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.end <= formData.start) {
      alert("L'heure de fin doit être après l'heure de début.");
      return;
    }

    if (editId !== null) {
      setSeances(
        seances.map((s) =>
          s.id === editId ? { ...formData, id: editId } : s
        )
      );
    } else {
      setSeances([
        ...seances,
        { ...formData, id: Date.now() },
      ]);
    }

    resetForm();
  };

  const handleEdit = (s) => {
    setFormData({
      title: s.title,
      classe: s.classe,
      formateur: s.formateur,
      date: s.date,
      start: s.start,
      end: s.end,
      status: s.status,
    });

    setEditId(s.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSeances(seances.filter((s) => s.id !== id));
  };

  const filteredSeances = seances.filter((s) =>
    `${s.title} ${s.classe} ${s.formateur}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Gestion des séances</h1>
          <p>Planifier et gérer les séances de formation</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Ajouter séance
        </button>
      </div>

      {showForm && (
        <div className="students-card form-card">
          <h3>
            {editId !== null ? "Modifier séance" : "Nouvelle séance"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label>Nom de la séance</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Classe</label>
                <input
                  name="classe"
                  value={formData.classe}
                  onChange={handleChange}
                  placeholder="Ex: DD104"
                  required
                />
              </div>

              <div>
                <label>Formateur</label>
                <input
                  name="formateur"
                  value={formData.formateur}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Heure de début</label>
                <input
                  type="time"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Heure de fin</label>
                <input
                  type="time"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Statut</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Planifiée">Planifiée</option>
                  <option value="En cours">En cours</option>
                  <option value="Terminée">Terminée</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Annuler
              </button>

              <button type="submit" className="add-button">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="students-card">
        <div className="students-toolbar">
          <h3>
            <CalendarDays size={18} />
            Liste des séances ({seances.length})
          </h3>

          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Rechercher une séance..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="students-table">
          <thead>
            <tr>
              <th>Séance</th>
              <th>Classe</th>
              <th>Formateur</th>
              <th>Date</th>
              <th>Horaire</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSeances.map((s) => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.classe}</td>
                <td>{s.formateur}</td>
                <td>{s.date}</td>
                <td>{s.start} - {s.end}</td>
                <td>{s.status}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(s)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(s.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredSeances.length === 0 && (
              <tr>
                <td colSpan="7">Aucune séance trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
