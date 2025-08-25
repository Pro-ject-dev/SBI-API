const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define("Payment", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement:true
 },
  orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  date: {
    type:DataTypes.STRING,
    allowNull: true
},
  paidAmt:DataTypes.STRING,
  remark: DataTypes.STRING,
  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'payment',
  timestamps: true
});

module.exports = Payment;