const Products = require("../models/products");


exports.getAllProducts = (req, res, next) => {
    res.render('add-product', { docTitle: 'Add Product' });
};

exports.addProduct = (req, res, next) => {
    const product = new Products(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getAddedProducts = (req, res, next) => {
    Products.fetchAll(products => {
        res.render('shop', { prods: products, docTitle: 'Shop', hasProducts: products.length > 0 });
    });
}
