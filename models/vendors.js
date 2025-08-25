const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendor = sequelize.define('Vendor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT
    },
    contactPerson: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT
    },
    phone: {
        type: DataTypes.TEXT
    },
    address: {
        type: DataTypes.TEXT
    },
    gstNumber: {
        type: DataTypes.TEXT
    },
    paymentTerms: {
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
    },
}, {
    tableName: 'vendors',
    timestamps: true
});

module.exports = Vendor;
