const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use(userRoutes);
app.use(adminRoutes);

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express.js');
})

app.listen(3000);
