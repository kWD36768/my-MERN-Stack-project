const mongoose =  require("mongoose");

const categoryschema = new mongoose.Schema({

            name : {
                type : String , 
                required  :true , 
                trim : true ,
            }
            ,

            thumbnail : {
                type : String,

            } , 

            parent_category : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : 'parentcategory' 

            }

            ,

            description : String ,
            status : {
                type : Boolean ,
                default  : true
            } , 

            created_at : Date , 

            updated_at : Date 





})

categoryschema.pre('save' , (next)=>{
    const currentdate =  new Date();

    this.created_at = currentdate ;

    next()
})


categoryschema.pre('updateOne' , (next)=>{
    const currentdate =  new Date();

    this.created_at = currentdate;
        next()
})

categoryschema.pre('findAndUpdateOnw' , (next)=>{
    const currentdate =  new Date();

    this.created_at = currentdate;
        next()
})

categoryschema.pre('findByIdAndUpdate' , (next)=>{
    const currentdate = new Date();

    this.updated_at  = currentdate;

    
        next()
})


const productcategory  = mongoose.model('productcategory' , categoryschema)

module.exports = productcategory;

