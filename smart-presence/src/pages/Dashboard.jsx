
import React from "react";

import {
  Users,
  GraduationCap,
  CalendarDays,
  TrendingUp
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Dashboard() {

  // Statistiques
  const stats = [
    {
      title: "Total Étudiants",
      value: "250",
      icon: Users,
      color: "#246BFD",
      percent: "+12%"
    },
    {
      title: "Total Formateurs",
      value: "18",
      icon: GraduationCap,
      color: "#16A085",
      percent: "+5%"
    },
    {
      title: "Séances Aujourd'hui",
      value: "12",
      icon: CalendarDays,
      color: "#F39C12",
      percent: "+8%"
    },
    {
      title: "Taux de Présence",
      value: "92%",
      icon: TrendingUp,
      color: "#8E44AD",
      percent: "+4%"
    }
  ];

  // Données du graphique
  const attendanceData = [
    { day: "Lundi", present: 80, absent: 20 },
    { day: "Mardi", present: 90, absent: 10 },
    { day: "Mercredi", present: 75, absent: 25 },
    { day: "Jeudi", present: 95, absent: 5 },
    { day: "Vendredi", present: 85, absent: 15 },
    { day: "Samedi", present: 70, absent: 30 }
  ];

  // Dernières présences
  const recentAttendance = [
    {
      name: "Ahmed Benali",
      class: "DEV101",
      time: "08:15",
      status: "Présent"
    },
    {
      name: "Sara Amrani",
      class: "DEV102",
      time: "08:20",
      status: "Présent"
    },
    {
      name: "Youssef Karim",
      class: "DEV101",
      time: "08:30",
      status: "Absent"
    },
    {
      name: "Salma Idrissi",
      class: "DEV103",
      time: "08:35",
      status: "Présent"
    }
  ];

  return (
    <div className="dashboard">

      {/* Welcome */}
      <div className="welcome">
        <h1>Bonjour, Administrateur 👋</h1>
        <p>
          Voici un aperçu de votre établissement aujourd'hui.
        </p>
      </div>

      {/* Statistiques */}
      <div className="stats-container">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <div className="stat-card" key={index}>

              <div className="stat-top">

                <div
                  className="stat-icon"
                  style={{ background: stat.color }}
                >
                  <Icon size={23} color="white" />
                </div>

                <span>{stat.percent}</span>

              </div>

              <h2>{stat.value}</h2>

              <p>{stat.title}</p>

            </div>
          );

        })}

      </div>

      {/* Chart + Table */}
      <div className="dashboard-grid">

        {/* Attendance Chart */}
        <div className="chart-card">

          <h3>Statistiques de présence</h3>

          <p>Suivi hebdomadaire</p>

          <ResponsiveContainer width="100%" height={280}>

            <BarChart data={attendanceData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="present"
                name="Présents"
                fill="#246BFD"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="absent"
                name="Absents"
                fill="#F39C12"
                radius={[5, 5, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Recent Attendance */}
        <div className="attendance-card">

          <h3>Dernières présences</h3>

          <p>Activité récente</p>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>Classe</th>
                  <th>Heure</th>
                  <th>Statut</th>
                </tr>
              </thead>

              <tbody>

                {recentAttendance.map((student, index) => (

                  <tr key={index}>

                    <td>{student.name}</td>

                    <td>{student.class}</td>

                    <td>{student.time}</td>

                    <td>
                      <span
                        className={
                          student.status === "Présent"
                            ? "status-present"
                            : "status-absent"
                        }
                      >
                        {student.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
