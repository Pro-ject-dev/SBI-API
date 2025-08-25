const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RawmaterialsLog = sequelize.define('RawmaterialsLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orderId: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rawMaterial: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    qty: {
        type: DataTypes.TEXT
    },
   type: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'raw_materials_log',
    timestamps: true
});

module.exports = RawmaterialsLog;
