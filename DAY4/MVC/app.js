const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');
app.set('views', 'views')

//app.set('view engine', 'pug');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.error);

app.listen(3000);


