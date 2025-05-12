const express = require('express');
const router = express.Router();
const productController = require('./controller/ProductController');
const addonsController = require('./controller/AddonsController');
const banksController = require('./controller/BanksController');
const termsController = require('./controller/TermsController');

//PRODUCTS ROUTES---------------------------------------------
router.get('/getProduct', productController.getproduct);
router.post('/addProduct', productController.addproduct);
router.put('/editProduct', productController.editproduct);
router.put('/deleteProduct',productController.deleteProduct);


//ADDONS ROUTES----------------------------------------------
router.get('/getAddons', addonsController.getAddons );
router.post('/addAddons', addonsController.addAddons);
router.put('/editAddons', addonsController.editAddons);
router.put('/deleteAddons',addonsController.deleteAddons);


//BANKS ROUTES-----------------------------------------------
router.get('/getBanks', banksController.getBank);
router.post('/addBank', banksController.addBank);
router.put('/editBank', banksController.editBank);
router.put('/deleteBank',banksController.deleteBank);

//TERMS ROUTES-----------------------------------------------
router.get('/getTerms',termsController.getTerms);
router.post('/addTerms',termsController.addTerms);
router.put('/editTerms',termsController.editTerms);
router.put('/deleteTerms',termsController.deleteTerms);

module.exports=router;