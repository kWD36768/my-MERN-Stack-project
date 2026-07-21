
const mongoose = require('mongoose')

const sizeschema = mongoose.Schema({
    name : String , 
    order : String

})

sizeschema.pre('save' , (next)=>{

    const currentDate = new Date();
    if(this.new){
        this.createdat = currentDate ;
    }

    else{
        this.updatedat = currentDate
     }

     next();
})

const Sizesmodel = mongoose.model('size' , sizeschema)

module.exports = Sizesmodel