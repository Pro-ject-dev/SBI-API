const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderDeadline = sequelize.define("OrderDeadline", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement:true
 },
  orderId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  name:{
      type: DataTypes.TEXT,
      allowNull: false
    },
  startAt: {
    type:DataTypes.STRING,
    allowNull: true
},
 endAt: {
    type:DataTypes.STRING,
    allowNull: true
},
delayReason:{
  type: DataTypes.TEXT,
  allowNull:true,
},

  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'order_deadline',
  timestamps: true
});

module.exports = OrderDeadline;