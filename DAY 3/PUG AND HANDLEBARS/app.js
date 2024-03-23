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

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render(404,{docTitle : '404'});
});

app.listen(3000);


