const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  image: {
    type: String,
  },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },

  description: {
    type: String,
    minlength: 0,
    maxlength: 150,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  images: {
    type: String,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

function validateProductData(product) {
  const schema = {
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    categoryId: Joi.string().required(),
    description: Joi.string().min(10).max(100),
  };

  return Joi.validate(product, schema);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProductData;
