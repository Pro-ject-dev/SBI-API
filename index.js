require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const app = express();
app.use(express.json());
const routes = require('./route.js');
const auth = require('./middleware/Authentication.js');
app.use('/api/admin',auth,routes);

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());

// CORS Setup
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express and Sequelize!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
