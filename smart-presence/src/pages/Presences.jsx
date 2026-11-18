
import React, { useState } from "react";
import { Search, Download, CheckCircle, XCircle, Clock } from "lucide-react";

export default function Presences() {
  const [presences, setPresences] = useState([
    {
      id: 1,
      student: "Sara Amrani",
      classe: "DD104",
      seance: "Introduction React",
      date: "2026-11-18",
      time: "09:05",
      status: "Présent",
    },
    {
      id: 2,
      student: "Youssef Alaoui",
      classe: "DD104",
      seance: "Introduction React",
      date: "2026-11-18",
      time: "09:10",
      status: "Présent",
    },
    {
      id: 3,
      student: "Imane Bennani",
      classe: "DD104",
      seance: "Introduction React",
      date: "2026-11-18",
      time: "--",
      status: "Absent",
    },
    {
      id: 4,
      student: "Omar Tazi",
      classe: "DD105",
      seance: "Base de données",
      date: "2026-11-18",
      time: "14:00",
      status: "En retard",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");

  const changeStatus = (id, status) => {
    setPresences(
      presences.map((p) =>
        p.id === id
          ? { ...p, status, time: status === "Absent" ? "--" : p.time }
          : p
      )
    );
  };

  const filtered = presences.filter((p) => {
    const matchesSearch =
      `${p.student} ${p.classe} ${p.seance}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "Tous" || p.status === filter;

    return matchesSearch && matchesFilter;
  });

  const presentCount = presences.filter(
    (p) => p.status === "Présent"
  ).length;

  const absentCount = presences.filter(
    (p) => p.status === "Absent"
  ).length;

  const lateCount = presences.filter(
    (p) => p.status === "En retard"
  ).length;

  const exportCSV = () => {
    const headers = [
      "Etudiant",
      "Classe",
      "Seance",
      "Date",
      "Heure",
      "Statut",
    ];

    const rows = presences.map((p) => [
      p.student,
      p.classe,
      p.seance,
      p.date,
      p.time,
      p.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${value}"`).join(";")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "presences.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Gestion des présences</h1>
          <p>Suivre les présences et les absences des étudiants</p>
        </div>

        <button className="add-button" onClick={exportCSV}>
          <Download size={18} />
          Exporter CSV
        </button>
      </div>

      <div className="presence-stats">
        <div className="presence-stat">
          <CheckCircle color="#20a779" size={25} />
          <div>
            <h3>{presentCount}</h3>
            <p>Présents</p>
          </div>
        </div>

        <div className="presence-stat">
          <XCircle color="#e34b4b" size={25} />
          <div>
            <h3>{absentCount}</h3>
            <p>Absents</p>
          </div>
        </div>

        <div className="presence-stat">
          <Clock color="#d97706" size={25} />
          <div>
            <h3>{lateCount}</h3>
            <p>En retard</p>
          </div>
        </div>
      </div>

      <div className="students-card">
        <div className="students-toolbar">
          <h3>Liste des présences</h3>

          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Rechercher étudiant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="presence-filters">
          {["Tous", "Présent", "Absent", "En retard"].map((status) => (
            <button
              key={status}
              className={
                filter === status ? "filter-button selected" : "filter-button"
              }
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="table-responsive">
          <table className="students-table">
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Classe</th>
                <th>Séance</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Statut</th>
                <th>Modifier statut</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.student}</td>
                  <td>{p.classe}</td>
                  <td>{p.seance}</td>
                  <td>{p.date}</td>
                  <td>{p.time}</td>

                  <td>
                    <span className={`presence-badge ${p.status === "Présent" ? "present" : p.status === "Absent" ? "absent" : "late"}`}>
                      {p.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={p.status}
                      onChange={(e) =>
                        changeStatus(p.id, e.target.value)
                      }
                    >
                      <option value="Présent">Présent</option>
                      <option value="Absent">Absent</option>
                      <option value="En retard">En retard</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7">Aucune présence trouvée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
