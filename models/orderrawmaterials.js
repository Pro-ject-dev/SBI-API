const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderRawMaterials = sequelize.define("OrderRawMaterials", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement:true
 },
  orderId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  rawMaterial:{
      type: DataTypes.TEXT,
      allowNull: false
    },
  qty: {
    type:DataTypes.STRING,
    allowNull: true
},
  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'order_rawmaterial',
  timestamps: true
});

module.exports = OrderRawMaterials;