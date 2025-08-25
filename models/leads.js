const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Leads = sequelize.define('leads', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    module: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isOrder: {
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
        allowNull: false,
    },
  }, {
    tableName: 'leads',
    timestamps: true, 
  });

module.exports=Leads;