const mongoose  = require('mongoose') ; 

const userschema = new mongoose.Schema({
    f_name : String ,
    l_name : String , 
    email : String,   
    password : String
})

module.exports  = mongoose.model('users' , userschema)