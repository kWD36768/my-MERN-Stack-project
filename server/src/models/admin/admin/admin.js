const mongoose = require('mongoose');
const adminschema = new mongoose.Schema({
    email : String , 
    password : String,
    name : String ,
    fb : String ,
    instagram : String ,
    youtube  : String , 
    twitter  : String ,
    logo  : String ,
    fav_icon : String ,
    footer_icon: String

})

const admin = mongoose.model('/admin' , adminschema);
module.exports = admin