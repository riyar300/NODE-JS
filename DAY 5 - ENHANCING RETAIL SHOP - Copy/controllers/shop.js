const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  }).catch((err)=>{
      console.log(err);
    })

}

exports.getProductById = (req, res, next) => {
  const prodid = req.params.productid;
  console.log("Product ID: ", prodid);
  Product.fetchProductById(prodid).then(product => {
    res.render('shop/product-detail', { product: product[0], pageTitle: "Product-Detail",path: '/products' });
  }).catch(err => {
    console.log(err);
  })


};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log(err);
  })


};

// exports.getCart = (req, res, next) => {
//   Cart.fetchCart((cartContent) => {
//     console.log(Object.keys(cartContent).length);
//     if(Object.keys(cartContent).length){
//     console.log(cartContent);

//     Product.fetchAll(products => {
      
//       const productsArray = [];
//       for(product of products){

//         var cartProduct = cartContent.products.find(p => p.id === product.id);
   
//         if(cartProduct){
//           const prodJson = {...product};
//           console.log("prodJson" , prodJson);
//           prodJson.qty = cartProduct.qty;;
//           productsArray.push(prodJson);
//         }
        
//       }
    
//       console.log(productsArray);
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         prods : productsArray
//       });
//     })
//   }else{
//     res.render('shop/cart', {
//       path: '/cart',
//       pageTitle: 'Your Cart',
//       prods : []
//     });
//   }
//   })
//   // const products = [];
//   // res.render('shop/cart', {
//   //   path: '/cart',
//   //   pageTitle: 'Your Cart',
//   //   prods : products
//   // });
  
// };

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };

// exports.addToCart = (req,res,next) => {
//   Product.fetchProductById(req.body.productId, (product) => {
//     Cart.addProduct(req.body.productId, product.price);
//     res.redirect('/cart');
//   });
  
// };

// exports.deleteItem = (req, res, next) => {
//   var id = req.body.productId;
//   Product.fetchProductById(id, product => {
//     Cart.deleteProduct(id, product.price);
//     res.redirect('/cart');
//   });
  
// };
