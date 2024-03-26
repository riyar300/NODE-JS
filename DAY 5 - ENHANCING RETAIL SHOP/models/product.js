const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this; 
       
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{

      this.id = ((Math.random()*1000000) | 0).toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
      }
      
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchProductById(id, cb){
    getProductsFromFile(products =>{
      const ProductById = products.find(p => p.id == id);
      cb(ProductById); //p is equal to each product json in the products array
    })
  }

  static deleteById(id){
    getProductsFromFile((products) => {
      const updatedProd = products.filter(prod => prod.id !== id);
      
      console.log(updatedProd);
      fs.writeFile(p, JSON.stringify(updatedProd), err => {
        console.log(err);
      });
    })
  }
}
