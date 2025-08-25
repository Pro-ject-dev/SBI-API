const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Setup
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions));



app.use(express.json());

// Routes
const auth = require('./middleware/Authentication.js');
const routes = require('./route.js');
const operation_manager_routes = require('./operation_manager_route.js');
const warehouse_manager_routes = require('./warehouse_manager_route.js');
app.use('/api/admin', auth, routes);
app.use('/api/operation_manager', auth, operation_manager_routes);
app.use('/api/warehouse_manager', auth, warehouse_manager_routes);

// Health check
app.get('/', (req, res) => {
  res.send('Hello from Express and Sequelize!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
