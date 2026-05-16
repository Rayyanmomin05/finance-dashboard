import React, { useState } from 'react';

const CATEGORIES = ['Food', 'Rent', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Savings'];

function ExpenseForm({ onAdd }) {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) return;
    onAdd({ category, amount, note });
    setAmount('');
    setNote('');
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Amount (₹)</label>
        <input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Note (optional)</label>
        <input type="text" placeholder="e.g. Groceries" value={note} onChange={e => setNote(e.target.value)} />
      </div>
      <button onClick={handleSubmit} className="btn-primary">+ Add Expense</button>
    </div>
  );
}

export default ExpenseForm;