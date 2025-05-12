const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ComboMapping = sequelize.define('Mapping', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    comboid: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
     catid: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
     productid: {
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
    tableName: 'mapping_products',
    timestamps: true
});

module.exports = ComboMapping;
