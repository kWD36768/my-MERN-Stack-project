const admin = require('../../../models/admin/admin/admin');

const nodemailer = require('nodemailer')

const otpstoer = new Map() ; 
require('dotenv').config();
let otpobject = {};
const registeradmin = async ()=>{

 const ifadmin = await  admin.find();

if(ifadmin.length !== 0) console.log(ifadmin[0])

    const data  = new admin({
    email  : process.env.EMAIL ,
    password  : process.env.PASSWORD 
    }
);
// ...existing code...
console.log(data);
// ...existing code...
const response  = await data.save();

console.log(response)
}


const login = async (req, res) => {
  try {
      console.log("BODY:", req.body); 
     const admindata  = await admin.findOne({email : req.body.email})

        console.log("DB:", admindata);   


     if(!admindata) return res.status(401).json({message  : "please provide a valid email"})
      
      if (admindata.password !== req.body.password) return  res.status(401).json({message  : "please provide a valid password"})
     
    res.status(200).json({ message: 'success' , data  : admindata});


  } catch (error) {


    console.log(error);


    res.status(500).json({ message: 'internal server error' });

  }

};


const readadmin = async (req , res)=>{
  try{

    const response =   await admin.find();

    // console.log(response)
    // const { password , ...datawithoutPassword} = response[0]._doc;

    // console.log(datawithoutPassword)

    const path =`${req.protocol}://${req.get('host')}/frank-and-oak-files/admin/`
    res.status(200).json({ message: 'Admin readed successfully' , data : response , path});

  }

  catch (error) {


    console.log(error);
    res.status(500).json({ message: 'internal server error' });

  }
}

const updateadmin = async (req , res)=>{
  try{      

    const data  =  req.body ;
    if(req.files){
      if(req.files.logo){
        data.logo  = req.files.logo[0].filename
      }

      if(req.files.fav_icon){
        data.fav_icon = req.files.fav_icon[0].filename ;

      }

      if(req.files.footer_icon){
        data.footer_icon = req.files.footer_icon[0].filename
      }
    }

    console.log(data)


    const response = await admin.updateOne(
      req.params ,
      {$set   : data} 
    ) 
  console.log(req.params)
res.status(200).json({message  : "admin updated successfully" , data  : response})
  }

  catch(error){
    console.log(error)
    res.status(500).json({ message: 'internal server error cuold not update admin too',  data:'response'});
    
  }
}


  const generatgeotandupdateemail = async(req , res)=>{

  try{
    console.log(req.body)
      
    const generateotp = Math.floor(Math.random() * 99999999 )

    console.log(generateotp)
    otpobject[req.body.email] = generateotp ;

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


module.exports = {
   registeradmin ,
    login,
    readadmin,
    updateadmin,
    generatgeotandupdateemail
  };
