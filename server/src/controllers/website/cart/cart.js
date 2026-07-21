const Cart = require("../../../models/cart/cart");

const cartcontroller = async (req, res) => {
  try {
    console.log('req.body',req.body);
  
    const datatosave = new Cart(req.body);
    const response = await datatosave.save();
    res
      .status(200)
      .json({ message: "cart controller is working", data: response });
  }
  catch (error) {
    console.log(error);
  }
};

const readcart = async (req, res) => {
  try {
const data = await Cart.find({ user: req.params.user })
  .populate("product")
  .populate("colors")
  .populate("sizes");

    res.status(200).json({ message: "add to cart readed successfullly", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteproduct = async (req , res) =>{
  try{
    const data = await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "cart delted successfully "})
  
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "internal server error"})
  }
}

const quantityupdate = async (req , res) =>{
  try{
    const data = await Cart.updateOne(
      req.params , 
      {
        $set : {quantity : req.body.newquantity}
      }
    )
    res.status(200).json({message : "Quantity updated successfully "})
  
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "internal server error"})
  }
}
module.exports = {
  cartcontroller,
  readcart,
  deleteproduct,
  quantityupdate
};
