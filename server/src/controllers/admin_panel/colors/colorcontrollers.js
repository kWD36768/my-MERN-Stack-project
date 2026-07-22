const Colors = require("../../../models/admin/colors/color");

// amincontrollers
const addcolors = async (req, res) => {
  try {
    console.log(req.body);
    const datatosave = new Colors(req.body);

    const response = await datatosave.save();

    res.status(200).json({ message: "success", data: response });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

const readcolors = async (req, res) => {
  const response = await Colors.find();
  try {
    res
      .status(200)
      .json({ message: "colors fetched successfully", data: response });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

const deletecolor = async (req, res) => {
  try {
    const { id } = req.params;

    const newid = { _id: id };
    const response = await Colors.deleteOne(newid);
    console.log(req.params);
    res.status(200).json({ message: "color has been deleted successfully", data: response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "color could not deleted" });
  }
};


const changestatus  = async (req, res)=>{


  try{
    const {id} = req.params ;

    const param = {_id  : id}

const response = await Colors.updateOne(
param ,
{
  $set :{ status  : req.body.newstatus}
}


)


    res.status(200).json({ message : "status updated successfuly" , data  : response})
  }

  catch(error){
    console.log(error)
    res.status(500).json({message  : "status could not be updated"})
  }
  
}

const deleteallcolors = async (req , res )=>{



    try{
   const response = await Colors.deleteMany({_id  : {$in : req.body.ids}
})

    res.status(200).json({ message : "status updated successfuly" , data  : response})

    console.log(req.body.ids)
  }

  catch(error){
    console.log(error)
    res.status(500).json({message  : "status could not be updated"})
  }
  
}


const readcolorbyid = async (req , res)=>{
  try{
    
    const {id} = req.params;
    const newid = {_id  : id}
    console.log(newid)
    const response  = await Colors.find(newid)

    
    res.status(200).json({message : "collor readed successfully" , data  : response})
  }

  catch(error){
    console.log(error)
    res.status(500).json({message  : "internal server error"})
  }
}

const updatecolor = async (req , res)=>{

  try{
    const {id} = req.params;
    const newid = {_id  : id}
    const response  =  await Colors.findByIdAndUpdate(

     newid, 
      {
        $set  : req.body
      }
    )
   
    if(!response) res.status(404).json({message  : "color not found"})
      res.status(200).json({message :" color updated successfully"})
  }

  catch(error){
    console.log(error)
  }
}

const truecolors = async (req, res) => {
  try {
    console.log(req.body);
    const datatosave = await Colors.find({status  :  true});


    res.status(200).json({ message: "success", data: datatosave });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

module.exports = {
  addcolors,
  readcolors,
  deletecolor,
  changestatus,
  deleteallcolors,
  readcolorbyid,
  updatecolor,
  truecolors
  
};
