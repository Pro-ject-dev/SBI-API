require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const app = express();
app.use(express.json());
const routes = require('./route.js');
const auth = require('./middleware/Authentication.js');
app.use('/api/admin',auth,routes);

app.get('/', (req, res) => {
  res.send('Hello from Express and Sequelize!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
