const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Banks = sequelize.define('banks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    acName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    acType: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    ifscCode: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    bankName: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    acNumber: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    micrCode: {
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
        allowNull: false
    }
}, {
    tableName: 'banks',
    timestamps: true
});

module.exports = Banks;
