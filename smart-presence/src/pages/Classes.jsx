
import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

export default function Classes() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "DD104",
      filiere: "Développement Digital",
      niveau: "2ème année",
      formateur: "Ahmed Karimi",
      students: 25,
    },
    {
      id: 2,
      name: "DD105",
      filiere: "Développement Digital",
      niveau: "1ère année",
      formateur: "Fatima Zahra",
      students: 30,
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    filiere: "",
    niveau: "",
    formateur: "",
    students: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      filiere: "",
      niveau: "",
      formateur: "",
      students: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setClasses(
        classes.map((c) =>
          c.id === editId
            ? { ...formData, id: editId, students: Number(formData.students) }
            : c
        )
      );
    } else {
      setClasses([
        ...classes,
        {
          ...formData,
          id: Date.now(),
          students: Number(formData.students),
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (c) => {
    setFormData({
      name: c.name,
      filiere: c.filiere,
      niveau: c.niveau,
      formateur: c.formateur,
      students: String(c.students),
    });

    setEditId(c.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Gestion des classes</h1>
          <p>Consulter et gérer les classes</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Ajouter classe
        </button>
      </div>

      {showForm && (
        <div className="students-card form-card">
          <h3>
            {editId !== null ? "Modifier classe" : "Nouvelle classe"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label>Nom de la classe</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Filière</label>
                <input
                  name="filiere"
                  value={formData.filiere}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Niveau</label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir niveau</option>
                  <option value="1ère année">1ère année</option>
                  <option value="2ème année">2ème année</option>
                </select>
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
                <label>Nombre d'étudiants</label>
                <input
                  type="number"
                  min="0"
                  name="students"
                  value={formData.students}
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

              <button type="submit" className="add-button">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="students-card">
        <div className="students-toolbar">
          <h3>Liste des classes ({classes.length})</h3>

          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Rechercher une classe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="students-table">
          <thead>
            <tr>
              <th>Classe</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Formateur</th>
              <th>Étudiants</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClasses.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.filiere}</td>
                <td>{c.niveau}</td>
                <td>{c.formateur}</td>
                <td>{c.students}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(c)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredClasses.length === 0 && (
              <tr>
                <td colSpan="6">Aucune classe trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
