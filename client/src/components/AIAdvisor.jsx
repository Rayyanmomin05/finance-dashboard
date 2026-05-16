import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AIAdvisor({ expenses, income }) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAdvice = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_URL}/api/analyze`, { expenses, income });
      setAdvice(res.data.advice);
    } catch (err) {
      setError('Failed to get advice. Check your API key and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="card ai-card">
      <h2>🤖 AI Financial Advisor</h2>
      <p className="ai-subtitle">Get personalized savings tips based on your spending</p>
      <button onClick={getAdvice} disabled={loading} className="btn-ai">
        {loading ? 'Analyzing...' : 'Get AI Advice'}
      </button>
      {error && <p className="error-text">{error}</p>}
      {advice && (
        <div className="advice-box">
          {advice.split('\n').filter(Boolean).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIAdvisor;