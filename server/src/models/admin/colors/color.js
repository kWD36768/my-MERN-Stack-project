const mongoose = require("mongoose");

const colorschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },

  updatedat: {
    type: Date,
    default: Date.now
  },
});

const Colors = mongoose.model("colors", colorschema);

module.exports = Colors;
