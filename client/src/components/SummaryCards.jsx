import React from 'react';

function SummaryCards({ income, totalExpenses, savings }) {
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

  return (
    <div className="summary-cards">
      <div className="summary-card income">
        <p className="card-label">Monthly Income</p>
        <p className="card-value">₹{income.toLocaleString()}</p>
      </div>
      <div className="summary-card expenses">
        <p className="card-label">Total Expenses</p>
        <p className="card-value">₹{totalExpenses.toLocaleString()}</p>
      </div>
      <div className={`summary-card savings ${savings >= 0 ? 'positive' : 'negative'}`}>
        <p className="card-label">Savings</p>
        <p className="card-value">₹{savings.toLocaleString()}</p>
        <p className="card-sub">{savingsRate}% savings rate</p>
      </div>
    </div>
  );
}

export default SummaryCards;