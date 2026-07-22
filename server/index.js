const express = require('express');
const allroutes = require('./src/app');
const app  = express();
const cors = require('cors');
require('dotenv').config();
require('./src/db/config');
app.use(express.json());
app.use(cors());
// app.use('/frank-and-oak/productcategory' , express.static('src/uploads/productcategory'));
// app.use('/frank-and-oak-files/admin' , express.static('src/uploads/admin'));

app.use(
  '/frank-and-oak-files/product_img',
  express.static('src/uploads/product/product_img')
);

app.use(
  '/frank-and-oak-files/image_animation',
  express.static('src/uploads/product/image_animation')
);

app.use(
  '/frank-and-oak-files/product_gallery',
  express.static('src/uploads/product/product_gallery')
);


app.use('/api' , allroutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});












