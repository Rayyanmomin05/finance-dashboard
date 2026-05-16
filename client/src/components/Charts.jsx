import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6', '#f97316'];

function Charts({ expenses }) {
  const grouped = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const values = Object.values(grouped);
  const colors = labels.map((_, i) => COLORS[i % COLORS.length]);

  const doughnutData = {
    labels,
    datasets: [{ data: values, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
  };

  const barData = {
    labels,
    datasets: [{ data: values, backgroundColor: colors, borderRadius: 4 }]
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: val => `₹${val}` } } }
  };

  return (
    <div className="card charts-card">
      <h2>Spending Breakdown</h2>
      <div className="charts-grid">
        <div>
          <h3>By Category</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div>
          <h3>Amounts</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default Charts;