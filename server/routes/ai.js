const express = require('express');
const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { expenses, income } = req.body;

    if (!expenses || expenses.length === 0) {
      return res.status(400).json({ error: 'No expenses provided' });
    }

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const savings = income - totalExpenses;
    const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
    const expenseSummary = expenses.map(e => `${e.category}: ₹${e.amount}`).join(', ');

    const prompt = `A user has the following monthly finances:
- Monthly Income: ₹${income}
- Total Expenses: ₹${totalExpenses}
- Savings: ₹${savings} (${savingsRate}% savings rate)
- Expense Breakdown: ${expenseSummary}

Based on this data, give exactly 3 specific, actionable, and friendly savings tips.
Format each tip as a short paragraph starting with a bold title.
Be concise, practical, and encouraging.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq error:', data);
      return res.status(500).json({ error: 'Groq API error' });
    }

    res.json({
      advice: data.choices[0].message.content,
      summary: { totalExpenses, savings, savingsRate }
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to get AI advice' });
  }
});

router.post('/categorize', async (req, res) => {
  res.json({ category: 'Other' });
});

module.exports = router;