import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import AIAdvisor from './components/AIAdvisor';
import './App.css';

function App() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const savings = Number(income) - totalExpenses;

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Finance Dashboard</h1>
        <p>Track your expenses · Get AI-powered insights</p>
      </header>
      <main className="app-main">
        <div className="left-panel">
          <div className="card">
            <h2>Monthly Income</h2>
            <input
              type="number"
              placeholder="Enter income (₹)"
              value={income}
              onChange={e => setIncome(e.target.value)}
              className="income-input"
            />
          </div>
          <ExpenseForm onAdd={addExpense} />
          {expenses.length > 0 && (
            <div className="card">
              <h2>Expenses</h2>
              <ul className="expense-list">
                {expenses.map(e => (
                  <li key={e.id} className="expense-item">
                    <span className="expense-category">{e.category}</span>
                    <span className="expense-amount">₹{e.amount}</span>
                    <button onClick={() => removeExpense(e.id)} className="remove-btn">×</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-panel">
          <SummaryCards income={Number(income)} totalExpenses={totalExpenses} savings={savings} />
          {expenses.length > 0 && <Charts expenses={expenses} />}
          {expenses.length > 0 && income && <AIAdvisor expenses={expenses} income={Number(income)} />}
        </div>
      </main>
    </div>
  );
}

export default App;