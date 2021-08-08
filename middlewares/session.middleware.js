const Session = require("../models/session.model");

module.exports = async function (req, res, next) {
  // nếu request không có cookie sessionId thì tạo session > luu vào db > lấy id ra set cookie
  if (!req.signedCookies.sessionId) {
    const session = new Session({});
    const product = await session.save();
    res.cookie("sessionId", product.id, { signed: true, maxAge: 24 * 60 * 60 }); // { signed: true} bật lên nếu dùng Signed Cookie(người dùng chỉnh sửa mình sẽ biết)
  }
  next();
};
