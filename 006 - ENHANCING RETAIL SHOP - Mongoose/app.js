const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6637cd7afcf39a15be8e4724')
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
            console.log(err);
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://nodeAdminV2:nodeAdminV2@retailshopcluster.friskiy.mongodb.net/shop?retryWrites=true&w=majority&appName=RetailShopCluster').then(result => {
    console.log("Connected!!");
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Riya',
                email: 'riya@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })

    app.listen(3000);
}).catch(err => {
    console.log(err);
})

