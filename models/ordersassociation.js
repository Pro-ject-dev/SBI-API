const Orders = require('../models/orders');
const Leads = require('../models/leads');
const Estimation = require('../models/estimation');
const OrderRawMaterials = require('../models/orderrawmaterials');
const OrderDeadline = require('../models/orderdeadline');
const StockAssignment = require('../models/stockassignments');

Orders.belongsTo(Estimation, { foreignKey: 'estId', as: 'estimation' });
Orders.belongsTo(Leads, { foreignKey: 'LeadId', as: 'leads' });

Estimation.hasMany(Orders, { foreignKey: 'estId', as: 'orders' });
Leads.hasMany(Orders, { foreignKey: 'LeadId', as: 'orders' });

Orders.hasMany(OrderRawMaterials, { foreignKey: 'orderId', as: 'rawMaterials' });
Orders.hasMany(OrderDeadline, { foreignKey: 'orderId', as: 'deadline' });


Orders.hasMany(StockAssignment, { foreignKey: 'orderId', as: 'assignMaterials' });

module.exports = {
  Estimation,
  Leads,
  Orders,
  OrderRawMaterials,
  OrderDeadline,
  StockAssignment
};
