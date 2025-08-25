const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StockAssignment = sequelize.define('StockAssignment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orderId: {
        type: DataTypes.TEXT
    },
    rawMaterial:{
        type:DataTypes.TEXT
    },
    rawMaterialId: {
        type: DataTypes.TEXT
    },
    quantityAssigned: {
        type: DataTypes.TEXT
    },
    assignedBy: {
        type: DataTypes.TEXT
    },
    assignedDate: {
        type: DataTypes.TEXT
    },
    notes: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false
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
    }
}, {
    tableName: 'stock_assignments',
    timestamps: true
});

module.exports = StockAssignment;
