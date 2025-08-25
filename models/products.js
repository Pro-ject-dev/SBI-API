const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  productName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ratePerQuantity: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  grade: {
    type: DataTypes.TEXT,
    allowNull: false
  },
   weightOfObject: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  length: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  width: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thickness: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  maxCost: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  minCost: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  isStandard: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'products', 
  timestamps: true
});

module.exports = Product;
