const express  = require('express');
const { login, readadmin, updateadmin, generatgeotandupdateemail } = require('../../controllers/controllers');
const { registeradmin } = require('../../controllers/controllers');
const fileuploads = require('../../middleware/multer/multer');




const adminroutes = express.Router();

adminroutes.post('/register' , registeradmin);
adminroutes.post('/login' , login);
adminroutes.get('/readadmin' , readadmin)
adminroutes.put('/updateadmin/:_id', fileuploads('admin') , updateadmin)
adminroutes.post('/generatgeotandupdateemail' , generatgeotandupdateemail)  

module.exports = adminroutes

