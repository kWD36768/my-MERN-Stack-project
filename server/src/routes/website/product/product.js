const express = require('express');
const { webreadproduct } = require('../../../controllers/website/products/prouct');

const webproductRouter = express.Router();

webproductRouter.get('/read_product', webreadproduct
);

module.exports = webproductRouter;