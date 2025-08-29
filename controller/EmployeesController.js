
const Employee = require('../models/employees');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const employee = await Employee.findOne({ where: { mail: mail, status: '1' } });
        if (!employee) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: employee.id, role: employee.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ success: true, token: token ,data:{id:employee.id,name:employee.name,role:employee.role}});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to login', error: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const { search } = req.query;

        const whereClause = {
            status: '1',
        };

        if (search && search.trim() !== '') {
            whereClause.name = {
                [Op.like]: `%${search.trim()}%`
            };
        }

        const employees = await Employee.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch employees', error: error.message });
    }
};


exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.query;
        const employee = await Employee.findOne({
            where: {id:id,status:"1"},
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch employee', error: error.message });
    }
};



exports.addEmployee = async (req, res) => {
    try {
        const {
            name,
            mail,
            date,
            mobile,
            password,
            role
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await Employee.create({
            name,
            mail,
            date,
            mobile,
            password: hashedPassword,
            role,
            status: '1'
        });

        res.status(200).json({ success: true, message:"Employee Added Successfully !" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add employee', error: error.message });
    }
};




exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Employee ID is required in query params' });
    }

    const employee = await Employee.findByPk(id);

    if (!employee || employee.status !== '1') {
      return res.status(404).json({ success: false, message: 'Employee not found or inactive' });
    }

    // If password is included in request body, hash it before updating
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await employee.update(req.body);

    res.status(200).json({ success: true, message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update employee', error: error.message });
  }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(200).json({ success: false, message: 'Employee ID is required in query params' });
        }

        const employee = await Employee.findByPk(id);

        if (!employee || employee.status !== '1') {
            return res.status(200).json({ success: false, message: 'Employee not found or already inactive' });
        }

        await employee.update({ status: '0' });

        res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete employee', error: error.message });
    }
};


exports.getEmployeeNames = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            where: { status: '1' },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        });

        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch employee names', error: error.message });
    }
};
