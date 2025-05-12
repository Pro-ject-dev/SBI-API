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
    ac_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ac_type: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    ifsc_code: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    bankname: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    ac_number: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    micr_code: {
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
