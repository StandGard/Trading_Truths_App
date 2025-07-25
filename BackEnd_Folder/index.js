const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware to allow frontend access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Root route - updated message
app.get('/', (req, res) => {
  res.send('✅ Trading Truth backend is running on Render!');
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    backend: true,
    timestamp: new Date().toISOString()
  });
});

// Dashboard data route (placeholder/demo data)
app.get('/api/dashboard', (req, res) => {
  res.json({
    totalPnl: 0,
    accountBalance: 12450.75,
    winRate: 65.0,
    trades: 0,
    message: "Demo data from backend"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
