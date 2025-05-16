const express = require('express');
const router = express.Router();
const productController = require('./controller/ProductController');
const addonsController = require('./controller/AddonsController');
const banksController = require('./controller/BanksController');
const termsController = require('./controller/TermsController');
const comboController = require('./controller/ComboController');
const categoryController = require('./controller/CategoryController');
const comboMappingController = require('./controller/ComboMappingController');


//PRODUCTS ROUTES---------------------------------------------
router.get('/getProduct', productController.getproduct);
router.get('/getProductbyId', productController.getproductbyId);
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


//COMBO ROUTES------------------------------------------------
router.get('/getCombos',comboController.getCombo);
router.post('/addCombo',comboController.addCombo);
router.put('/deleteCombo',comboController.deleteCombo);

//CATEGORY ROUTES------------------------------------------------
router.get('/getCategory',categoryController.getCategory);
router.post('/addCategory',categoryController.addCategory);
router.put('/deleteCategory',categoryController.deleteCategory);


//COMBOMAPPING ROUTES---------------------------------------------
router.get('/getComboMap',comboMappingController.getComboMapping);
router.post('/addComboMap',comboMappingController.addComboMapping);
router.put('/deleteComboMap',comboMappingController.deleteComboMapping);

module.exports=router;