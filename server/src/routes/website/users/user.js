const express = require('express');
const { generateotp, registerotp, loginuser } = require('../../../controllers/controllers');

const userrouter = express.Router();

userrouter.post('/generateotp' , generateotp) ;

userrouter.post('/registerotp' , registerotp) ;

userrouter.post('/loginuser' , loginuser)

module.exports = userrouter; 