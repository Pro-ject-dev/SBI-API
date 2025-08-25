const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Orders = sequelize.define("Orders", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement:true
 },
  leadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  estId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  date: {
    type:DataTypes.STRING,
    allowNull: true
},
  orderStatus: DataTypes.STRING,
  deadlineStart:DataTypes.STRING,
  deadlineEnd:DataTypes.STRING,
  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Orders;