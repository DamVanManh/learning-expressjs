var md5 = require("md5");
var User = require("../models/user.model");

module.exports.login = function (req, res) {
  res.render("auth/login");
};
module.exports.postLogin = async function (req, res) {
  // request post gửi lên email và password
  var emailReq = req.body.email;
  var password = req.body.password;
  // tìm người dùng bằng email
  var user = await User.findOne({ email: emailReq }).exec();
  // nếu không tồn tại email
  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist."],
      values: req.body,
    });
    return;
  }
  var hashedPassword = md5(password);
  // nếu password không dúng
  if (user.password !== hashedPassword) {
    res.render("auth/login", {
      errors: ["Wrong password."],
      values: req.body,
    });
    return;
  }
  // tạo cookie với name: { userId: user.id }
  res.cookie("userId", user.id, { signed: true }); // { signed: true} bật lên nếu dùng Signed Cookie, _id.str: xem bài 4. Data types
  res.redirect("/users");
};
