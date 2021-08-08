let Transfer = require("../models/transfer.model");

module.exports.create = function (req, res, next) {
  res.render("transfer/create", { csrfToken: req.csrfToken() });
};
module.exports.postCreate = async function (req, res, next) {
  var data = {
    amount: parseInt(req.body.amount),
    accountId: req.body.accountId,
    userId: req.signedCookies.userId,
  };
  await Transfer.create(data);
  res.redirect("/transfer/create");
};
