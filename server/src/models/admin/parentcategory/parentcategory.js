const mongoose = require("mongoose");

const categoryschema = new mongoose.Schema({
  name: {
    type : String ,
    unique : true
  },
  description: String,
  status: {
    type: Boolean,
    default: true
  },

  createdat: {
    type: Date,
    default: Date.now
  },
  updatedat: {
    type: Date
  }
});

categoryschema.pre("save", (next) => {
  const currentDate = new Date();
  if (this.new) {
    this.createdat = currentDate;
  } else {
    this.updatedat = currentDate;
  }

  next();
});
const Parentcategory = mongoose.model("parentcategory", categoryschema);

module.exports = Parentcategory;
