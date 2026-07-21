const express = require('express');

const { cartcontroller, readcart, deleteproduct, quantityupdate } = require('../../../controllers/website/cart/cart');

const cartRouter = express.Router();

cartRouter.post('/add_to_cart', cartcontroller);

cartRouter.get('/cart_read/:user', readcart);

cartRouter.delete('/deleteproduct/:id', deleteproduct);

cartRouter.put('/quantityupdate/:_id' , quantityupdate)

module.exports = cartRouter;