const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminRoutes = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products =  adminRoutes.products;
  res.render('shop', {prods : products, docTitle : 'Shop', hasProducts : products.length > 0});
});

module.exports = router;


