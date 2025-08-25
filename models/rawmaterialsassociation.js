const Vendor = require('./vendors');
const Rawmaterial = require('./rawmaterials');


Rawmaterial.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });
Vendor.hasMany(Rawmaterial, { foreignKey: 'vendorId', as: 'rawmaterials' });

module.exports = {
  Vendor,
  Rawmaterial
};
