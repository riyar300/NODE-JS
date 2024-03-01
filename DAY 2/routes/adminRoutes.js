const express = require('express');
const path = require('path');

const routes = express.Router();

routes.get('/shop', (req, res, next) => {
    res.sendFile(path.join(__dirname,"../","views","shop.html"));
})

module.exports = routes;