const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Estimation = sequelize.define("Estimation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  termId:DataTypes.STRING,
  bankId:DataTypes.STRING,
  leadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  referenceNumber: DataTypes.STRING,
  orderDate: DataTypes.STRING,
  documentType: DataTypes.STRING,
  customerName: DataTypes.STRING,
  customerAddress1:DataTypes.STRING,
  customerAddress2:DataTypes.STRING,
  customerCity:DataTypes.STRING,
  customerCountry:DataTypes.STRING,
  customerState:DataTypes.STRING,
  customerZip:DataTypes.STRING,
  customerPhone: DataTypes.STRING,
  customerGstin: DataTypes.STRING,
  subtotal: DataTypes.STRING,
  discount:DataTypes.STRING,
  discountAmount: DataTypes.STRING,
  totalAfterDiscount: DataTypes.STRING,
  taxCgst: DataTypes.STRING,
  taxSgst: DataTypes.STRING,
  taxTotal: DataTypes.STRING,
  grandTotal: DataTypes.STRING,
  bankAccountHolder: DataTypes.STRING,
  bankName: DataTypes.STRING,
  bankAccountNumber: DataTypes.STRING,
  bankAccountType: DataTypes.STRING,
  bankIfscCode: DataTypes.STRING,
  bankMicrCode: DataTypes.STRING,
  bankBranchName: DataTypes.STRING,
  termsTitle: DataTypes.STRING,
  termsDescription: DataTypes.TEXT,
  companyName: DataTypes.STRING,
  companySubtitle: DataTypes.STRING,
  companyGstin: DataTypes.STRING,
  companyTagline: DataTypes.STRING,
  companyAddressStreet: DataTypes.STRING,
  companyAddressArea: DataTypes.STRING,
  companyContactSales: DataTypes.STRING,
  companyContactService: DataTypes.STRING,
  companyContactWebsite: DataTypes.STRING,
  companyContactEmail: DataTypes.STRING,
  companyFactoryAddress: DataTypes.STRING,
  status: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'estimation',
  timestamps: true
});

module.exports = Estimation;