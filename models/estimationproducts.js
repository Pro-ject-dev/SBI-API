const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EstProduct = sequelize.define("EstProduct", {
  id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
  estId: DataTypes.STRING,
  serialNumber: DataTypes.STRING,
  name: DataTypes.STRING,
  prodCode: DataTypes.STRING,
  category: DataTypes.STRING,
  combo: DataTypes.STRING,
  size: DataTypes.STRING,
  specification: DataTypes.TEXT,
  quantity: DataTypes.STRING,
  unitPrice: DataTypes.STRING,
  totalPrice: DataTypes.STRING,
  notes: DataTypes.STRING,
  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'est_products',
  timestamps: true
});

module.exports = EstProduct;