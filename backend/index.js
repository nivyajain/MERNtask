const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const product = require("./routes/products");
const category = require("./routes/categories");
const { Category } = require("./models/category");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/product_database")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));
app.use(express.json());
app.use(cors());

app.get("/allProducts", async (req, res) => {
  await Category.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "categoryId",
        as: "data",
      },
    },
    {
      $unwind: "$data",
    },
  ])
    .then((result) => {
      console.log("RESULT", result);
      if (!result) {
        return res.status(400).send("Record does not exists");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});
app.use("/api/products", product);
app.use("/api/categories", category);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
