const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EstProductAddon = sequelize.define("EstProductAddon", {
  id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
  productId: DataTypes.STRING,
  name: DataTypes.STRING,
  prodCode: DataTypes.STRING,
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
  tableName: 'est_product_addons',
  timestamps: true
});

module.exports = EstProductAddon;
