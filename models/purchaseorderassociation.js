const PurchaseOrders = require('./purchaseorders');
const PurchaseOrderItems = require('./purchaseorderitems');

PurchaseOrders.hasMany(PurchaseOrderItems, {
  foreignKey: 'purchaseId',
  as: 'items'
});

PurchaseOrderItems.belongsTo(PurchaseOrders, {
  foreignKey: 'purchaseId',
  as: 'order'
});

module.exports = {
  PurchaseOrders,
  PurchaseOrderItems
};
