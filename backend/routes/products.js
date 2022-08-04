const { Product, validate } = require("../models/product");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
    createdAt: Date.now(),
    updatedAt: null,
  });

  if (req.file) {
    product.images = req.file.filename;
  }
  product = await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categoryId: req.body.categoryId,
      images: req.body.images,
      updatedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findOneAndRemove({ _id: req.params.id });

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

router.get("/id", (req, res) => {
  const product = Product.find((c) => c.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");
  res.send(product);
});

module.exports = router;
