const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://nodeAdminV2:nodeAdminV2@retailshopcluster.friskiy.mongodb.net/shop?retryWrites=true&w=majority&appName=RetailShopCluster')
    .then((client)=>{
        console.log('Connected!');
        _db = client.db();
        callback();
    }).catch((err)=>{
        console.log(err);
    })
}

const getDb = () => {
    if(_db){
        return _db;
    }else{
        throw 'No database found!';
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
