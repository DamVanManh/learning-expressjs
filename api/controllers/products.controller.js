const Product = require("../../models/product.model");

module.exports.products = async function (req, res) {
  var products = await Product.find();
  res.json(products);
};
module.exports.getOneProduct = async function (req, res) {
  var product = await Product.findById(req.params.id).exec();
  res.json(product);
};

module.exports.create = async function (req, res) {
  var products = await Product.create(rep.body);
  res.json(products);
};
// module.exports.putOne = async function (req, res) {
//   // input: {id:"gfdsg", product: {data}}
//   var product = await Product.replaceOne({ _id: req.body.id }, req.body);
//   res.json(product);
// };
