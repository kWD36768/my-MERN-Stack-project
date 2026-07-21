 const nodemailer = require('nodemailer');
const user = require('../../../models/user/user');
 const otpstore = new Map() ;
  const jwt = require('jsonwebtoken') ;

  const bcrypt = require('bcrypt')
const saltrounds = 10 ; 
 const generateotp= async(req , res)=>{

  try{
    console.log(req.body)
  

      
    const generateotp = Math.floor(Math.random() * 99999)
     

    otpstore.set(req.body.email , generateotp)

       const transporter = nodemailer.createTransport({
        service  : "Gmail" ,
        auth : {
          user : process.env.DOMEMAIL ,
          pass  : process.env.Domain_PASSWORD
        }
       })

       const mailoptions = {
        from    : process.env.DOMEMAIL ,
        to      : req.body.email , 
       subject  : "OTP for update email" ,
       text     : `your OTP for update email  is ${generateotp}`
       }

     transporter.sendMail(mailoptions , (error , info)=>{
    if (error) {
  console.error("Email error:", error);
  return res.status(500).json({ message: "could not send email" });
}
      res.status(200).json({message : "OTP sent successfully"})
      })
       
  }
  catch(error){
    res.status(500).json({message : "email could not updated successfully"})

  }

}

const registerotp = async (req , res) =>{
  try{
   
    const {email , password ,f_name , l_name , otp} = req.body ;

    bcrypt.hash(password , saltrounds , async (error , hashedpasword) =>{
      
    if(Number(otp) !== otpstore.get(email)) return res.status(401).json({message : "Invalid OTP"})

      const datatosave  = new user({
        f_name ,
        l_name ,
       password :  hashedpasword ,
        email

      })

      const response  = await datatosave.save();
         
      const datawithoutpassword = response._doc ;
      
      jwt.sign(datawithoutpassword , process.env.JWT_KEY , {expiresIn : 60 * 60 * 24 * 7} , (error , token) =>{

        if(error) return res.status(500).json({message : "Internal server error"})
             res.status(200).json({message : "OTP verified successfully" , data : response , auth : token})
      })
    })

    // cosnt {...bilal , email password } = req.body

  }

  catch(error){
    res.status(500).json({message : "OTP could not verified successfully"})
  }
}

  
const loginuser = async (req , res) =>{
  
  try{

    const ifadmin = await user.findOne({email : req.body.email}) ;

    if(!ifadmin) return res.status(404).json({message : "User not found"})



   const ismatch = await bcrypt.compare(req.body.password , ifadmin.password) ;

   if(!ismatch) return res.status(401).json({message : "invalid password"})

jwt.sign(ifadmin._doc ,process.env.JWT_KEY , {expiresIn : 60 * 60 * 24 *7} , (error  , token) =>{

  if(error) return res.status(500).json({message : "internal server error"}
   
  )
   res.status(200).json({message : "Login successful" , data : ifadmin , auth : token})
})
  }

  catch(error){
    console.log(error)
    res.status(500).json({message : "Internal server error"})
  }
} 
module.exports = {
    generateotp,
    registerotp,
    loginuser
} 