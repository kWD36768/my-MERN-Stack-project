
const express = require('express');
const multer = require("multer");   // ✅ add this
const upload = multer({ dest: "uploads/" }); 
const { insertproduct,  readproduct } = require('../../controllers/controllers');
const fileuploads = require('../../middleware/multer/multer');

const productrouter = express.Router()

productrouter.post('/insertproduct' ,  upload.fields([
    { name: "product_img" },
    { name: "image_animation" },
    { name: "product_gallery" }
  ]) , insertproduct );

productrouter.get('/readproduct' , readproduct)
module.exports = productrouter ;

