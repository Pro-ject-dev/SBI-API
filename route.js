const express = require('express');
const router = express.Router();
const productController = require('./controller/ProductController');
const addonsController = require('./controller/AddonsController');
const banksController = require('./controller/BanksController');
const termsController = require('./controller/TermsController');
const comboController = require('./controller/ComboController');
const categoryController = require('./controller/CategoryController');
const leadsController = require('./controller/LeadsController');
const comboMappingController = require('./controller/ComboMappingController');
const estimationController = require('./controller/EstimationController');
const paymentController = require('./controller/PaymentController');
const purchaseOrderController = require('./controller/PurchaseOrderController');
const rawMaterialsController = require('./controller/RawMaterialsController');
const vendorController = require('./controller/VendorsController');
const ordersController = require('./controller/OrdersController');
const employeesController = require('./controller/EmployeesController');


//PRODUCTS ROUTES---------------------------------------------
router.get('/getProduct', productController.getproduct);
router.post('/getProductbyCombo&Category', productController.getProductbyComboAndCategory);
router.get('/getProductbyId', productController.getproductbyId);
router.post('/addProduct', productController.addproduct);
router.put('/editProduct', productController.editproduct);
router.put('/deleteProduct',productController.deleteProduct);
router.get('/getProductbyStr', productController.getProductbyStr);
router.post('/isProductExists', productController.isProductExists);
router.get('/getProductsByFilter',productController.getProductsByFilter);
router.post('/updateProductCost',productController.incrementDecrementProductCost);



//ADDONS ROUTES----------------------------------------------
router.get('/getAddons', addonsController.getAddons );
router.get('/getAddonsbyId', addonsController.getaddonsbyId);
router.post('/addAddons', addonsController.addAddons);
router.put('/editAddons', addonsController.editAddons);
router.put('/deleteAddons',addonsController.deleteAddons);
router.post('/isAddonsExists', addonsController.isAddonsExists);
router.get('/getAddonsByFilter',addonsController.getAddonsByFilter);
router.post('/updateAddonsCost',addonsController.incrementDecrementAddonsCost);
router.get('/getAddonsbyStr', addonsController.getAddonsbyStr);

//BANKS ROUTES-----------------------------------------------
router.get('/getBanks', banksController.getBank);
router.get('/getBankbyId', banksController.getBankbyId);
router.post('/addBank', banksController.addBank);
router.put('/editBank', banksController.editBank);
router.put('/deleteBank',banksController.deleteBank);


//TERMS ROUTES-----------------------------------------------
router.get('/getTerms',termsController.getTerms);
router.get('/getTermsbyId',termsController.getTermsbyId);
router.post('/addTerms',termsController.addTerms);
router.put('/editTerms',termsController.editTerms);
router.put('/deleteTerms',termsController.deleteTerms);


//COMBO ROUTES------------------------------------------------
router.get('/getCombos',comboController.getCombo);
router.post('/addCombo',comboController.addCombo);
router.put('/deleteCombo',comboController.deleteCombo);
router.get('/getCombobyStr',comboController.getCombobyStr);
router.post('/isComboExists',comboController.isComboExists);

//CATEGORY ROUTES------------------------------------------------
router.get('/getCategory',categoryController.getCategory);
router.get('/getCategorybyCombo',categoryController.getCategorybyCombo);
router.post('/addCategory',categoryController.addCategory);
router.put('/deleteCategory',categoryController.deleteCategory);
router.get('/getCategorybyStr',categoryController.getCategorybyStr);
router.post('/isCategoryExists',categoryController.isCategoryExists);


//COMBOMAPPING ROUTES---------------------------------------------
router.post('/getComboMap',comboMappingController.getComboMapping);
router.post('/addComboMap',comboMappingController.addComboMapping);
router.put('/deleteComboMap',comboMappingController.deleteComboMapping);

//LEADS ROUTES-----------------------------------------------------
router.post('/addLeads',leadsController.addLeads);
router.get('/getAllLeads',leadsController.getAllLeads);
router.get('/getLeadsById',leadsController.getLeadsById );
router.put('/editLeads',leadsController.editLeads);
router.put('/convertLeadsToOrder',leadsController.convertLeads);
router.put('/deleteLead',leadsController.deleteLeads);

//ESTIMATION ROUTES------------------------------------------------
router.post('/addEstimation', estimationController.createEstimation);
router.get('/getEstimation', estimationController.getEstimationsByLeadId);
router.put('/editEstimation', estimationController.updateEstimation);
router.delete('/deleteEstimation', estimationController.deleteEstimation);

//PAYMENT ROUTES-----------------------------------------------------

router.post('/addPayment',paymentController.addPayment);
router.get('/getAllPayment',paymentController.getAllPayments);
router.get('/getPaymentByOrderId',paymentController.getPaymentById);
router.put('/updatePayment',paymentController.updatePayment);
router.delete('/deletePayment',paymentController.deletePayment);


// PURCHASE ORDER ROUTES--------------------------------
router.get('/getPurchaseOrders', purchaseOrderController.getAllOrders);
router.put('/updatePurchaseOrderStatus', purchaseOrderController.updatePurchaseOrderStatus);


// Raw Materials Routes--------------------------------
router.get('/getAllRawMaterials', rawMaterialsController.getAllRawMaterials);

// VENDOR ROUTES--------------------------------
router.get('/getAllVendors', vendorController.getAllVendors);



// ORDERS ROUTES--------------------------------

router.get('/getAllOrders' , ordersController.getAllOrders);
router.get('/getOrderById' , ordersController.getOrdersById);


// EMPLOYEES ROUTES--------------------------------
router.get('/getAllEmployees', employeesController.getAllEmployees);
router.get('/getEmployeeById', employeesController.getEmployeeById);
router.post('/addEmployee', employeesController.addEmployee);
router.put('/updateEmployee', employeesController.updateEmployee);
router.delete('/deleteEmployee', employeesController.deleteEmployee);
router.get('/getEmployeeNames', employeesController.getEmployeeNames);


module.exports=router;