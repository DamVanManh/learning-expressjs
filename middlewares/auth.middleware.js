var User = require("../models/user.model");

module.exports.requireAuth = async function (req, res, next) {
  // nếu request không có cookie userId thì redirect về login
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  // nếu có cookie userId thì tìm xem id đó có trong db không
  const id = await User.findById(req.signedCookies.userId).exec();
  var user = await User.findOne({ email: req.body.email }).exec();
  res.locals.user = user; // để hiển thị tên user đang đăng nhập hiện tại trong user/index
  // không thấy id đó trong db thì redirect về login
  if (!id) {
    res.redirect("/auth/login");
    return;
  }
  next(); // cho phép qua
};
