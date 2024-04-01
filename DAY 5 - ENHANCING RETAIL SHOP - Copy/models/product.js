
const { ObjectId } = require('mongodb');
const mongoClient = require('../util/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
  }

  save() {
    const db = mongoClient.getDb();
    let dbOp;
    if(this._id){
      dbOp = db.collection('products').updateOne({_id:new ObjectId(this._id)},{$set:this});
    }else{
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp.then((result) => {
      console.log(result);
    }).catch(err =>{
      console.log(err);
    })
  
  }

  static fetchAll() {
    const db = mongoClient.getDb();
    const collection = db.collection('products');
    const productsArray = collection.find().toArray();
    return productsArray;
  }

  static fetchProductById(id) {
    const db = mongoClient.getDb();
    const collection = db.collection('products');
    return collection.find({_id: new ObjectId(id)})
    .then((product) => {
      return product;
    })
    .catch(err =>{
      console.log(err);
    });
    
    
  }
  static deleteById(id) {
    const db = mongoClient.getDb();
    const collection = db.collection('products');
    return collection.deleteOne({_id: new ObjectId(id)})
    .then((result) => {
      console.log(result);
    })
    .catch(err =>{
      console.log(err);
    });
  }
}



