const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product.save().then((result) => {
    console.log("Product Created!");
    res.redirect('/admin/products');
  }).catch((err) => {
    console.log(err);
  });

};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      //console.log(result);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};


exports.getEditProduct = (req, res, next) => {
  var edit = req.query.edit;
  if (!edit) {

  } else {
    var id = req.params.productId;
    console.log(id);
    Product.findById(id)
      .then(product => {
        //console.log(product);
        res.render('admin/edit-product', {
          product: product,
          pageTitle: 'Edit Product',
          path: '/admin/products',
          editing: true
        });
      }).catch(err => {
        console.log(err);
      })

  }
}

exports.postEditProduct = (req, res, next) => {

  const id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const url = req.body.imageUrl;
  const desc = req.body.description;
  Product.findById(id)
    .then(product => {
      product.title = title;
      product.imageUrl = url;
      product.description = desc;
      product.price = price;
      return product.save()
    })
    .then(result => {
      console.log(result);
      console.log('Product Updated!');
      res.redirect('/admin/products');
    }).catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findByIdAndDelete(id)
    .then(() => {
      console.log('Product Deleted!');
      res.redirect('/admin/products');
    }).catch(err => console.log(err));


}