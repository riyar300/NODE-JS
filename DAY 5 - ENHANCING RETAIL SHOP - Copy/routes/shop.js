const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productid',shopController.getProductById);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.addToCart);

// router.post('/cart-delete-item', shopController.deleteItem);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);


module.exports = router;
