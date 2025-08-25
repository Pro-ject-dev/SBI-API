const express = require('express');
const router = express.Router();

const ordersController = require('./controller/OrdersController');
const rawMaterialsController = require('./controller/RawMaterialsController');

router.get('/getAllOrders' , ordersController.getAllOrders);
router.get('/getOrderById' , ordersController.getOrdersById);
router.put('/updateDeadline' , ordersController.updateDeadline);
router.post('/createRawMaterialsByOrder',ordersController.createRawMaterials);
router.post('/createDeadlineByOrder',ordersController.createDeadline);
router.put('/updateOrderStatus',ordersController.updateOrderStatus);

router.get('/getAllRawMaterials', rawMaterialsController.getAllRawMaterials);
router.get('/getRawMaterialById', rawMaterialsController.getRawMaterialbyId);

module.exports =router;