const Product = require("../models/product.model");
const Session = require("../models/session.model");

// Pagination
module.exports.index = async function (req, res) {
  var sessionId = req.signedCookies.sessionId; // lấy ra sessionId
  var page = parseInt(req.query.page || 1);
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var products = await Product.find();

  const session = await Session.findById(sessionId).exec();
  const cart = session?.cart ?? {};
  const arrayValueObjCart = Object.values(cart); // chuyển thành mảng chỉ chứa số lượng
  const amountProduct = arrayValueObjCart.reduce((amount, item) => {
    return (amount += item);
  }, 0);

  res.render("products/index", {
    products: products.slice(start, end),
    page,
    amountProduct,
  });
};
