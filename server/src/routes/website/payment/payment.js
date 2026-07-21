const express   = require('express') ; 
const topay = require('../../../controllers/website/payment/payment');
// const verifyjwt = require('../../../middleware/jwt/verifyjwt');

const paymentRouter = express.Router()

paymentRouter.post('/pay'   ,  topay) ;

module.exports = paymentRouter ;