
import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export default function Formateurs() {
  const [formateurs, setFormateurs] = useState([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Karimi",
      email: "ahmed@gmail.com",
      speciality: "React JS",
    },
    {
      id: 2,
      firstName: "Fatima",
      lastName: "Zahra",
      email: "fatima@gmail.com",
      speciality: "PHP",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    speciality: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      speciality: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setFormateurs(
        formateurs.map((f) =>
          f.id === editId ? { ...f, ...formData } : f
        )
      );
    } else {
      setFormateurs([
        ...formateurs,
        { id: Date.now(), ...formData },
      ]);
    }

    resetForm();
  };

  const handleEdit = (f) => {
    setFormData({
      firstName: f.firstName,
      lastName: f.lastName,
      email: f.email,
      speciality: f.speciality,
    });
    setEditId(f.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setFormateurs(formateurs.filter((f) => f.id !== id));
  };

  const filtered = formateurs.filter((f) =>
    `${f.firstName} ${f.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Gestion des formateurs</h1>
          <p>Consulter et gérer les formateurs</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Ajouter formateur
        </button>
      </div>

      {showForm && (
        <div className="students-card form-card">
          <h3>
            {editId !== null
              ? "Modifier formateur"
              : "Ajouter un formateur"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label>Prénom</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Nom</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Spécialité</label>
                <input
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  required
                />
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

              <button className="add-button" type="submit">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="students-card">
        <div className="students-toolbar">
          <h3>Liste des formateurs ({formateurs.length})</h3>

          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Spécialité</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.firstName} {f.lastName}</td>
                <td>{f.email}</td>
                <td>{f.speciality}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(f)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(f.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5">Aucun formateur trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
