
import React, { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: "Sara",
      lastName: "Amrani",
      email: "sara@gmail.com",
      className: "DD104",
      status: "Actif",
    },
    {
      id: 2,
      firstName: "Youssef",
      lastName: "Alaoui",
      email: "youssef@gmail.com",
      className: "DD105",
      status: "Actif",
    },
    {
      id: 3,
      firstName: "Imane",
      lastName: "Bennani",
      email: "imane@gmail.com",
      className: "DD104",
      status: "Inactif",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    className: "",
    status: "Actif",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? { ...student, ...formData }
            : student
        )
      );
    } else {
      const newStudent = {
        id: Date.now(),
        ...formData,
      };

      setStudents([...students, newStudent]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      className: "",
      status: "Actif",
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      className: student.className,
      status: student.status,
    });

    setEditId(student.id);
    setShowForm(true);
  };

  const deleteStudent = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-page">

      <div className="page-header">
        <div>
          <h1>Gestion des étudiants</h1>
          <p>Consulter et gérer la liste des étudiants</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Ajouter étudiant
        </button>
      </div>

      {showForm && (
        <div className="students-card form-card">
          <div className="form-header">
            <h3>
              {editId !== null
                ? "Modifier étudiant"
                : "Ajouter un étudiant"}
            </h3>

            <button
              className="close-button"
              onClick={resetForm}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div>
                <label>Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Nom</label>
                <input
                  type="text"
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
                <label>Classe</label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
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
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
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
                {editId !== null ? "Modifier" : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="students-card">

        <div className="students-toolbar">
          <h3>Liste des étudiants ({students.length})</h3>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
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
              <th>Classe</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>
                  {student.firstName} {student.lastName}
                </td>

                <td>{student.email}</td>
                <td>{student.className}</td>

                <td>
                  <span
                    className={
                      student.status === "Actif"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {student.status}
                  </span>
                </td>

                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(student)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-button delete"
                    onClick={() => deleteStudent(student.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6">
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
