const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Addons = sequelize.define('Addons', {
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ratePerKg: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  grade: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  weightOfObject: {
    type: DataTypes.TEXT,
    allowNull:false
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
  minCost: {
    type: DataTypes.TEXT,
    allowNull: false
  },
   maxCost: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
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
  tableName: 'addons', 
  timestamps: true
});

module.exports = Addons;
