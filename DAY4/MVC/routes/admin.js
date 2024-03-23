const path = require('path');

const express = require('express');

const productController = require('../controllers/products');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', productController.getAllProducts);

// /admin/add-product => POST
router.post('/add-product', productController.addProduct);

exports.routes  = router;
exports.products = products;

