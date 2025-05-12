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
  productname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rate_per_piece: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  grade: {
    type: DataTypes.TEXT,
    allowNull: false
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
  maxcost: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  gst: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  totalamount: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  maxsq_in: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  isstandard: {
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
