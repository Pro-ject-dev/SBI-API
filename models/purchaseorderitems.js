const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    purchaseId: {
        type: DataTypes.TEXT
    },
    rawMaterialId: {
        type: DataTypes.TEXT
    },
    rawMaterial: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.TEXT
    },
    unitPrice: {
        type: DataTypes.TEXT
    },
    totalPrice: {
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
    tableName: 'purchase_order_items',
    timestamps: true
});

module.exports = PurchaseOrderItem;
