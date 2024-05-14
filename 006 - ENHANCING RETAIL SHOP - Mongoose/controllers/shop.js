const Product = require('../models/product');
const Order = require('../models/orders');

exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  }).catch((err) => {
    console.log(err);
  })

}

exports.getProductById = (req, res, next) => {
  const prodid = req.params.productid;
  console.log("Product ID: ", prodid);
  Product.findById(prodid).then(product => {
    res.render('shop/product-detail', { product: product, pageTitle: "Product-Detail", path: '/products' });
  }).catch(err => {
    console.log(err);
  })


};

exports.getIndex = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log(err);
  })


};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const productsArray = user.cart.items;
      if (productsArray.length > 0) {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: productsArray
        });
      } else {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: []
        });
      }
    })


  // const products = [];
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle: 'Your Cart',
  //   prods: products
  // });

};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then(orders => {
    console.log(orders);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    })
  })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.addToCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      return req.user.addToCart(product);
    }).then(result => {
      console.log(result);
      res.redirect('/cart');
    });

};

exports.deleteItem = (req, res, next) => {
  var id = req.body.productId;
  req.user.deleteItemFromCart(id)
    .then((result) => {
      res.redirect('/cart');
    })



};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } }
      });


      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })

      return order.save()

    }).then(result => {
      return req.user.clearCart()

    }).then(() => {
      res.redirect('/orders');
    }).catch(err => {
      console.log(err)
    })

}
