const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data endpoints
app.get('/api/user', (req, res) => {
  res.json({
    id: '1',
    name: 'Test User',
    level: 1,
    xp: 0,
    balance: 1000,
    role: 'user'
  });
});

app.get('/api/achievements', (req, res) => {
  res.json([]);
});

app.get('/api/tasks', (req, res) => {
  res.json([]);
});

app.get('/api/shop', (req, res) => {
  res.json([]);
});

app.get('/api/cases', (req, res) => {
  res.json([]);
});

// Root endpoint
app.get('/', (req, res) => res.send('API OK'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend on ${PORT}`));