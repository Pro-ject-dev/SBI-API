const express = require('express');
const common_router = express.Router();
const employeesController = require('./controller/EmployeesController');

common_router.post('/login', employeesController.login);

module.exports = common_router;
