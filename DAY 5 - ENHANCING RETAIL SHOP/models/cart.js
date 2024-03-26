const path = require('path');
const fs = require("fs");
const products = require('./product');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
          let cart = { products: [], totalPrice: 0 };
          if (!err) {
            cart = JSON.parse(fileContent);
            
          }
          //console.log("Cart" , cart);
          // Analyze the cart => Find existing product
          const existingProductIndex = cart.products.findIndex(
            prod => prod.id === id
          );
          const existingProduct = cart.products[existingProductIndex];
          let updatedProduct;
          // Add new product/ increase quantity
          if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
          } else {
            updatedProduct = { id: id, qty: 1 };
            cart.products = [...cart.products, updatedProduct];
          }
          cart.totalPrice = cart.totalPrice + +productPrice;
          console.log(cart);
          fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
          });
        });
    }
    


    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(!err){
                const cartContent = JSON.parse(fileContent); 
                //{"products":[{"id":"756543","qty":1},{"id":"736226","qty":2}],"totalPrice":91}
      
                var updatedCart = {};
                var removedProduct = cartContent.products.find(prod => prod.id === id);
                if(!removedProduct){
                    return;
                }
                const removedProdQty = removedProduct.qty;
                
                updatedCart.products = cartContent.products.filter(prod => prod.id !== id);
                updatedCart.totalPrice = cartContent.totalPrice - productPrice*removedProdQty;
                fs.writeFile(p, JSON.stringify(updatedCart), (err) =>{
                    console.log(err);
                });
            }
        });
    }

    static fetchCart(cb){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                cb({});
            }else{
                cb(JSON.parse(fileContent));
            }
        });
    }
   
};