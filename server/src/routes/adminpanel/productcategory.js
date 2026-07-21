
const express = require('express');
const { productcategycontroller, readproductcategory, productcategorybyparentcategory } = require('../../controllers/controllers');
const fileuploads = require('../../middleware/multer/multer');

const productcategoryrouter = express.Router();

productcategoryrouter.post('/addproductcategory' , fileuploads('productcategory'),  productcategycontroller)

productcategoryrouter.get('/readproductcategory'  , readproductcategory);

productcategoryrouter.get('/productcategorybyparentcategory/:parent_category' , productcategorybyparentcategory)
module.exports = productcategoryrouter ;