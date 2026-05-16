const express = require('express');
const cors = require('cors');

const aiRoute = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', aiRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Finance Dashboard API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});