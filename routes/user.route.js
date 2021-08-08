var express = require("express");
var multer = require("multer");
const path = require("path");

var controller = require("../controllers/user.controller");
var validate = require("../validate/user.validate");

var storage = multer.diskStorage({
  destination: "./public/uploads/", // nơi lưu hình
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // file name mặc định không có đuôi nên phải lấy đuôi theo tên gốc
  },
});
var upload = multer({ storage: storage });

var router = express.Router();

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.get);

router.post(
  "/create",
  upload.single("avatar"), // avatar phải trùng tên prop key ở html
  validate.postCreate,
  controller.postCreate
);

module.exports = router;
