const Sizesmodel = require("../../../../models/admin/size/sizemodel");

const addsize = async (req, res) => {
  try {
    const datatosave = new Sizesmodel(req.body);
    const response = await datatosave.save();

    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in adding size" });
  }
};

const readsizecontroller = async (req, res) => {
  try {
    const response = await Sizesmodel.find();
    res
      .status(200)
      .json({ message: "sizes fetched successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching sizes" });
  }
};

const handledeletesize = async (req, res) => {
  try {
    const { id } = req.params;

    const newid = { _id: id };
    const response = await Sizesmodel.deleteOne(newid);

    if (response.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Size not found or already deleted" });
    }

    res.status(200).json({ message: "size has been deleted", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "size could not be deleted" });
  }
};

const handlesizestatus = async (req, res) => {
  try {
    const { id } = req.params;

    const param = { _id: id };
    const response = await Sizesmodel.updateOne(param, {
      $set: { status: req.body.newstatus },
    });

    console.log(req.params);
    res.status(200).json({
      message: "status has been updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "status has not been updated" });
  }
};

const deleteallsize = async (req, res) => {
  try {
    const response = await Sizesmodel.deleteMany({
      _id: { $in: req.body.ids },
    });

    res.status(200).json({ message: "size has been deleted", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "size could not be deleted" });
  }
};

const readsizebyid = async (req, res) => {
  try {
     const { id } = req.params;

    const newid = { _id: id };
    console.log(req.params)
    const response = await Sizesmodel.find(newid);
    res
      .status(200) 
      .json({ message: "size fetched successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching size" });
  }
};

const updatesize =  async (req , res)=>{

  try{

    const { id } = req.params;

    const newid = { _id: id };
  
    const response  =  await Sizesmodel.findByIdAndUpdate(
    newid, 

       {
        $set : req.body

       }
 
    )
    if(!response) res.status(404).json({message  : "please add a valid id"})

      res.status(200).json({message :" size updated successfully"})
    
  }

  catch(error){
    console.log(error)
    res.status(500).json({ message: "Error in updating size" });
  }
}



  const searchsizebyid = async (req, res) => {
  try {
  

    const response = await Sizesmodel.find({$or : [
      {name  : {$regex : new RegExp(req.params.key)}},
      {order  : {$regex : new RegExp(req.params.key)}}
    ]});

    if(!response) return res.status(404).json({message  : " no size found"})
    res.status(200) .json({ message: "size fetched successfully", data: response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in searching size" });
  }
};


module.exports = {
  addsize,
  readsizecontroller,
  handledeletesize,
  handlesizestatus,
  deleteallsize,
  readsizebyid,
  updatesize,
  searchsizebyid
};
