const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rawmaterials = sequelize.define('Rawmaterials', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT
    },
    unit: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.TEXT
    },
    minimumStock:{
         type: DataTypes.TEXT
    },
    currentStock: {
        type: DataTypes.TEXT
    },
    unitPrice: {
        type: DataTypes.TEXT
    },
    vendorId: {
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
    tableName: 'raw_materials',
    timestamps: true
});

module.exports = Rawmaterials;
