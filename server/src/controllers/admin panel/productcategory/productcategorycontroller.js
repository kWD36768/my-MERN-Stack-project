const Productcategory = require("../../../models/admin/productcategory/productcategory");

const productcategycontroller = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);
    console.log(req.files);
    if (req.files.thumbnail) {
      data.thumbnail = req.files.thumbnail[0].filename;
    }

    const datatosave = new Productcategory(data);

    const response = await datatosave.save();

    res
      .status(200)
      .json({ message: "product addedsuccessfully", data: response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Product category not added " });
  }
};

const readproductcategory = async (req, res) => {
  try {
    const productcategory = await Productcategory.find().populate(
      "parent_category",
      "name _id",
    );

    const response = productcategory.map((category) => {
      const { ...cat } = category._doc;

      const parentName = category.parent_category
        ? category.parent_category.name
        : "no-parent";

      cat.slug = `${parentName} + '-' + ${category.name}`;

      cat.thumbnail = `${req.protocol}://${req.get("host")}/frank-and-oak/productcategory/${category.thumbnail}`;

      return cat;
    });

    res
      .status(200)
      .json({
        message: "product Categories fetched successfully",
        data: response,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching productcategories" });
  }
};

const productcategorybyparentcategory = async (req, res) => {
  try {
    console.log(req.params)
    const productcategory = await Productcategory.find({parent_category :req.params.parent_category}) ;
    const response = productcategory.map((category) => {
      const { ...cat } = category._doc;

      const parentName = category.parent_category
        ? category.parent_category.name
        : "no-parent";

      cat.slug = `${parentName} + '-' + ${category.name}`;

      cat.thumbnail = `${req.protocol}://${req.get("host")}/frank-and-oak/productcategory/${category.thumbnail}`;

      return cat;
    });

    res
      .status(200)
      .json({
        message: "product Categories fetched successfully",
        data: response,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in fetching productcategories" });
  }
};

module.exports = {
   productcategycontroller,
    readproductcategory ,
    productcategorybyparentcategory
  };
