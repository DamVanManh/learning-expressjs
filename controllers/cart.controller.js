const Session = require("../models/session.model");

module.exports.addToCart = async function (req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }

  // nếu productId đã tồn tại tăng lên 1, không thì set mới giá trị productId đó là 1
  const session = await Session.findById(sessionId).exec();
  console.log("sesion ", session);
  let count = session?.cart?.[productId];
  if (!count) {
    const olds = await Session.findByIdAndUpdate(
      sessionId,
      {
        $set: { [`cart.${productId}`]: 1 }, // cú pháp cart. sẽ không ảnh hưởng đến các giá trị còn lại, nếu không nó sẽ ghi đè
      },
      { upsert: true } // tạo mới nếu không rìm thấy
    );
  } else {
    const olds = await Session.findByIdAndUpdate(sessionId, {
      $inc: { [`cart.${productId}`]: 1 },
    });
  }

  res.redirect("/products");
};
