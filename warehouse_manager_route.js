const express = require('express');
const router = express.Router();
const vendorController = require('./controller/VendorsController');
const rawMaterialsController = require('./controller/RawMaterialsController');
const ordersController = require('./controller/OrdersController');
const stockAssignmentsController = require('./controller/StockAssignmentController');
const purchaseOrderController= require('./controller/PurchaseOrderController');
const employeesController = require('./controller/EmployeesController');


router.get('/getAllVendors', vendorController.getAllVendors);
router.get('/getVendorById',vendorController.getVendorById)
router.post('/addVendor', vendorController.addVendor);    
router.put('/updateVendor', vendorController.updateVendor); 
router.delete('/deleteVendor', vendorController.deleteVendor); 


router.get('/getAllRawMaterials', rawMaterialsController.getAllRawMaterials);
router.get('/getRawMaterialById', rawMaterialsController.getRawMaterialbyId);
router.get('/getRawMaterialByName', rawMaterialsController.getRawMaterialbyName);
router.post('/addRawMaterial', rawMaterialsController.addRawMaterial);    
router.put('/updateRawMaterial', rawMaterialsController.updateRawMaterial); 
router.delete('/deleteRawMaterial', rawMaterialsController.deleteRawMaterial); 


router.put('/updateOrderStatus',ordersController.updateOrderStatus);
router.get('/getAllOrders' , ordersController.getAllOrders);
router.get('/getOrderById' , ordersController.getOrdersById);


router.post('/addStockAssignments',stockAssignmentsController.CreateStockAssignments);


router.post('/addPurchaseOrders', purchaseOrderController.createOrderWithItems);
router.get('/getPurchaseOrders', purchaseOrderController.getAllOrders);
router.get('/getPurchaseOrderById', purchaseOrderController.getOrderById);
router.put('/updatePurchaseOrder', purchaseOrderController.updateOrder);
router.delete('/deletePurchaseOrder', purchaseOrderController.deleteOrder);



router.get('/getAllEmployees', employeesController.getAllEmployees);
router.get('/getEmployeeById', employeesController.getEmployeeById);
router.post('/addEmployee', employeesController.addEmployee);
router.put('/updateEmployee', employeesController.updateEmployee);
router.delete('/deleteEmployee', employeesController.deleteEmployee);
router.get('/getEmployeeNames', employeesController.getEmployeeNames);

module.exports = router;
