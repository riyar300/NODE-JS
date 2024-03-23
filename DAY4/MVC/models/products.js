const path = require('path');
const fs = require('fs');

const dataFilePath = path.join(__dirname, '../', 'data', 'products.json');

module.exports = class Products {
    constructor(title) {
        this.title = title;
    }

    save() {
        fs.readFile(dataFilePath, (err, data) => {
            console.log(err);
            if (!err) {
                let products = [];
                //console.log(data);
                products = JSON.parse(data);
                products.push(this);
                fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                    console.log("err");
                })
            }
        })
    }

    static fetchAll(cb) {
        fs.readFile(dataFilePath, (err, data) => {

            if (err) {
               cb([]);
            }
            else {
                cb(JSON.parse(data));                
            }

        });
    }
}