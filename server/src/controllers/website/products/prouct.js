const Product = require("../../../models/product/product");
const webreadproduct = async (req, res) => {
  try {

    const response = await Product.find({ status: true })
      .populate("parent_category")
      .populate("product_category")
      .populate("sizes")
      .populate("colors");
    
      console.log('response',response)

    const filepath = `${req.protocol}://${req.get("host")}/frank-and-oak-files/`;

    res.status(200).json({
      message: "products fetched",
      data: response,
      filepath
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "product not fetched",
    });
  }
};

module.exports = { webreadproduct };
