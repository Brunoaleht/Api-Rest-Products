const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Product = mongoose.model(
  "Product",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      available: {
        type: Boolean,
      },
    },
    { timestamps: true }
  )
);

module.exports = Product;
