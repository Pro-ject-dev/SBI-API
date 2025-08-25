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
  comboId: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  catId: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  productId: {
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

ComboMapping.associate = (models) => {
  ComboMapping.belongsTo(models.products, { foreignKey: 'productId' });
  ComboMapping.belongsTo(models.category, { foreignKey: 'catId' });
  ComboMapping.belongsTo(models.combo, { foreignKey: 'comboId' });
};

module.exports = ComboMapping;
