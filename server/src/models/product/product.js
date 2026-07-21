const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  product_name: String,
  product_desc: String,
  product_short_desc: String,
  product_img: String,
  image_animation: String,
  product_gallery: String,
  product_price: Number,
  product_mrp: Number,
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parentcategory",
  },

  product_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory",
  },

  stock: {
    type: Boolean,
    default: true,
  },

  brand: String,
  sizes: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "size",
    },
  ],

  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colors",
    },
  ],

  created_at: Date,
  updated_at: Date,

  status: {
    type: Boolean,
    default: true,
  },
});

productschema.pre("save", function (next) {
  const currentdate = new Date();

  if (this.isNew) {
    this.created_at = currentdate;
  } else {
    this.updated_at = currentdate;
  }

  next();
});

productschema.pre("created_at", (next) => {
  const currentdate = new Date();
  if (this.new) {
    this.created_at = currentdate;
  } else {
    this.updated_at = currentdate;
  }

  next();
});

productschema.pre("findByIdAndUpdateOne", (next) => {
  const currentdate = new Date();
  if (this.new) {
    this.created_at = currentdate;
  } else {
    this.updated_at = currentdate;
  }

  next();
});

const Product = mongoose.model("products", productschema);

module.exports = Product;
