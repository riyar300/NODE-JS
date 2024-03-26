const Product = require('../models/product');
const cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    console.log(products);
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};


exports.getEditProduct =  (req, res, next) => {
  var edit = req.query.edit;
  if(!edit){

  }else{
  var id = req.params.productId;
  Product.fetchProductById(id, (product)=>{
    res.render('admin/edit-product', {
      product : product,
      pageTitle: 'Edit Product',
      path: '/admin/products',
      editing: true
    });
   
  })
  
}
}

exports.postEditProduct = (req, res, next) =>{
  
  const id = req.body.productId;
  const title =  req.body.title;
  const price =  req.body.price;
  const url =  req.body.imageUrl;
  const desc =  req.body.description;
  const updatedProduct = new Product(id, title, url, desc, price);
  
  updatedProduct.save();
  res.redirect('/');
}

exports.deleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchProductById(id, (product)=>{
    cart.deleteProduct(id, product.price);
  })
  Product.deleteById(id);
  
  res.redirect('/');
  
}