const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});
const Product = mongoose.model("Product", productSchema); // tham số thứ 3 là collection muốn lưu
module.exports = Product;
