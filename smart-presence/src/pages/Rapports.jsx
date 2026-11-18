import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import {
  TrendingUp,
  Users,
  UserCheck,
  UserX
} from "lucide-react";

export default function Rapports() {
  const monthlyData = [
    { month: "Jan", presence: 85, absence: 15 },
    { month: "Fev", presence: 90, absence: 10 },
    { month: "Mar", presence: 78, absence: 22 },
    { month: "Avr", presence: 92, absence: 8 },
    { month: "Mai", presence: 88, absence: 12 },
    { month: "Juin", presence: 95, absence: 5 }
  ];

  const statusData = [
    { name: "Présent", value: 75 },
    { name: "Absent", value: 15 },
    { name: "En retard", value: 10 }
  ];

  const COLORS = ["#20B486", "#EF4444", "#F59E0B"];

  return (
    <div className="reports-page">

      <div className="page-header">
        <div>
          <h1>Rapports</h1>
          <p>Consultez les statistiques de présence des étudiants.</p>
        </div>
      </div>

      {/* Statistiques */}

      <div className="report-stats">

        <div className="report-card">
          <div className="report-icon blue">
            <Users size={23} />
          </div>
          <div>
            <p>Total étudiants</p>
            <h2>250</h2>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon green">
            <UserCheck size={23} />
          </div>
          <div>
            <p>Présences</p>
            <h2>1 850</h2>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon red">
            <UserX size={23} />
          </div>
          <div>
            <p>Absences</p>
            <h2>320</h2>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon purple">
            <TrendingUp size={23} />
          </div>
          <div>
            <p>Taux de présence</p>
            <h2>85%</h2>
          </div>
        </div>

      </div>

      {/* Graphique mensuel */}

      <div className="report-chart-card">
        <h3>Évolution des présences</h3>
        <p>Statistiques mensuelles de présence et d'absence</p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="presence"
              name="Présence (%)"
              fill="#246BFD"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="absence"
              name="Absence (%)"
              fill="#EF4444"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Répartition */}

      <div className="report-chart-card">
        <h3>Répartition des présences</h3>
        <p>Pourcentage des différents statuts</p>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}