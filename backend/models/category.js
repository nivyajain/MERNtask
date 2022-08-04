const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },


    parentID: 
      { type: Schema.Types.ObjectId, ref: "Category"},
      createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategoryData(cat) {
  const schema = {
    name: Joi.string().min(3).required(),
    parentID: Joi.string(),
  };

  return Joi.validate(cat, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategoryData;
