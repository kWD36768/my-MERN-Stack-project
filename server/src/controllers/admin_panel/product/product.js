const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const Product = require("../../../models/product/product");

const insertproduct = async (req, res) => {
  try {
console.log("PRODUCT IMG:", req.files.product_img[0].filename);
console.log("PRODUCT GALLERY:", req.files.product_gallery[0].filename);
console.log("IMAGE ANIMATION:", req.files.image_animation[0].filename);
console.log(JSON.parse(req.body.sizes));

    const product = new Product({
        product_name: req.body.product_name,
  product_desc: req.body.product_desc,
  product_short_desc: req.body.product_short_desc,
  product_price: req.body.product_price,
  product_mrp: req.body.product_mrp,
  parent_category: req.body.parent_category,
  product_category: req.body.product_category,
  stock: req.body.stock,
  brand: req.body.brand,
  status: req.body.status,

  colors: JSON.parse(req.body.colors),

  sizes: JSON.parse(req.body.sizes),

  product_img: req.files.product_img[0].filename,
  image_animation: req.files.image_animation[0].filename,
  product_gallery: req.files.product_gallery[0].filename,
    });

    await product.save();

    res.status(200).json({
      message: "product inserted",
    });

  } catch (error) {
    console.log(error);
  }
};


 const readproduct = async(req , res)=>{
    try{
        

    console.log(req.body);   // ✅ data will show
    console.log(req.files);  // ✅ files will show

    const data = {
      ...req.body,
      colors: JSON.parse(req.body.colors || "[]"),
      sizes: JSON.parse(req.body.sizes || "[]"),
      stock: req.body.stock === "true",
      status: req.body.status === "true"
    };

    const product = await Product.create(data);

    res.json({
      message: "product inserted",
      data: product
    });
  
    }

    catch(error){
        console.log(error)
        res.status(500).json({message : "product could not readed"})

    }
}
module.exports =  {
    insertproduct,
    readproduct
}  