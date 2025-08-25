const Estimation = require('../models/estimation');
const EstProduct = require('../models/estimationproducts');
const EstProductAddon = require('../models/estimationprodaddons');

// Associations
Estimation.hasMany(EstProduct, { foreignKey: 'estId', as: 'products' });
EstProduct.belongsTo(Estimation, { foreignKey: 'estId', as: 'estimation' });

EstProduct.hasMany(EstProductAddon, { foreignKey: 'productId', as: 'addons' });
EstProductAddon.belongsTo(EstProduct, { foreignKey: 'productId', as: 'product' });

module.exports = {
  Estimation,
  EstProduct,
  EstProductAddon
};
