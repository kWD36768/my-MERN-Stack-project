const Parentcategory = require("../../../models/admin/parentcategory/parentcategory");

const addparentcategory = async (req, res) => {
  try {
    console.log(req.body);
    const datatosave = new Parentcategory(req.body);
    const response = await datatosave.save();

    res
      .status(200)
      .json({ message: "Category added successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in adding category" });
  }
};

const readparentcategory = async (req, res) => {
  try {
    const response = await Parentcategory.find();

    res
      .status(200)
      .json({ message: "Categories fetched successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching categories" });
  }
};

const deleteparentcategory = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const newid = { _id: id };

    const response = await Parentcategory.deleteOne({ _id: id });

    res
      .status(200)
      .json({ message: "Category deleted successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in adding category" });
  }
};

const updatestatus = async (req, res) => {
  try {
    const { id } = req.params;
    const param = { _id: id };

    const response = await Parentcategory.updateOne(param, {
      $set: { status: req.body.newstatus },
    });

    res
      .status(200)
      .json({
        message: "status has been deleted successfully",
        data: response,
      });
  } catch (error) {
    res.status(500).json({ message: "status coudl not be updated" });
    console.log(error);
  }
};

const deletemultiparentcategories = async (req, res) => {
  try {
    console.log(req.body);

    const response = await Parentcategory.deleteMany({
      _id: { $in: req.body.ids },
    });

    res
      .status(200)
      .json({
        message: "status has been deleted successfully",
        data: response,
      });
  } catch (error) {
    res.status(500).json({ message: "status coudl not be updated" });
    console.log(error);
  }
};

const readparentcategorybyid = async (req, res) => {
  try {
    const response = await Parentcategory.find(req.params);

    console.log(req.params);

    res
      .status(200)
      .json({ message: "Categories fetched successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching categories" });
  }
};

const handleupdatecategory = async (req, res) => {
  try {
    console.log(req.params, req.body);
    const response = await Parentcategory.findByIdAndUpdate(req.params, {
      $set: req.body,
    });

    if (!response) res.status(404).json({ message: "please add a valid ud" });

    res
      .status(200)
      .json({ message: "category updated successfully", data: "response" });
  } catch (error) {
    console.log(error);
  }
};

const searchparentcategory = async (req, res) => {
  try {

    const key =  req.params.key ; 
    const response = await Parentcategory.find({
      $or: [
        { name: { $regex: new RegExp(req.params.key) } },
        { description: { $regex: new RegExp(req.params.key) } },
      ],
    });

    if (response.length === 0)
      return res.status(404).json({ message: " no category found" });

    res.status(200).json({ message: "searched", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching categories" });
  }
};

const trueparentcategory = async (req, res) => {
  try {
    const response = await Parentcategory.find({ status: true });

    console.log(req.params);

    res
      .status(200)
      .json({ message: "Categories fetched successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching categories" });
  }
};

module.exports = {
  addparentcategory, 
  readparentcategory,
  deleteparentcategory,
  updatestatus,
  deletemultiparentcategories,
  readparentcategorybyid,
  handleupdatecategory,
  searchparentcategory,
  trueparentcategory,
};
