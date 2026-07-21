const express = require('express');
const adminroutes = require('./routes/adminpanel/admin');
const colorrouter = require('./routes/adminpanel/colors');
const parentcategoryrouter = require('./routes/adminpanel/parentcategory');
const sizerouter = require('./routes/adminpanel/size');
const productcategoryrouter = require('./routes/adminpanel/productcategory');
const productrouter = require('./routes/adminpanel/product');
const userrouter = require('./routes/website/users/user');
const cartRouter = require('./routes/website/cart/cart');
const webproductRouter = require('./routes/website/product/product');
const paymentRouter = require('./routes/website/payment/payment');

const adminrouter = express.Router()
const webrouter = express.Router()

const allroutes = express.Router();

//// admin routes


adminrouter.use('/admin' , adminroutes);
adminrouter.use('/colors' , colorrouter);
adminrouter.use('/parentcategory' , parentcategoryrouter);
adminrouter.use('/size' , sizerouter);
adminrouter.use('/productcategory' , productcategoryrouter )
adminrouter.use('/product', productrouter);

// web router

webrouter.use('/users'  , userrouter) ;

webrouter.use('/cart' , cartRouter)  ;

webrouter.use('/webproduct' , webproductRouter)

webrouter.use('/payment' , paymentRouter)

///// all routes

allroutes.use('/adminpanel', adminrouter);
allroutes.use('/frankandoak' , webrouter)



module.exports = allroutes;
