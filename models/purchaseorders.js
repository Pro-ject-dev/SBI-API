const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
   
    vendorId: {
        type: DataTypes.TEXT
    },
    vendor:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.TEXT
    },
    orderStatus: {
        type: DataTypes.TEXT
    },
    requestedBy: {
        type: DataTypes.TEXT
    },
    requestedDate: {
        type: DataTypes.TEXT
    },
    approvedBy: {
        type: DataTypes.TEXT
    },
    approvedDate: {
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
    tableName: 'purchase_orders',
    timestamps: true
});

module.exports = PurchaseOrder;
