require("dotenv").config();
var express = require("express");
var app = express();
const mongoose = require("mongoose");
var port = process.env.PORT || 3000;
const URI =
  "mongodb+srv://admin:<password>@cluster0.lffpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to DB");

    app.listen(process.env.PORT || 3000, function () {
      console.log("server listening on port 3000 " + process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });

var cookieParser = require("cookie-parser");

var userRoutes = require("./routes/user.route");
var authRoute = require("./routes/auth.route");
var cartRoute = require("./routes/cart.route");
var productsRoute = require("./routes/products.route");
var transferRoute = require("./routes/transfer.route");
var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");
var apiProductRoute = require("./api/routes/products.route");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });

app.set("view engine", "pug"); // set engine
app.set("views", "./views"); // set đường dẫn
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET)); // khai báo sử dụng cookieParser, tạo ra biến SESSION_SECRET: SESSION_SECRET=g4fd5sdFGV npm start
app.use(sessionMiddleware); // tác động trên tất cả request

app.use("/users", authMiddleware.requireAuth, userRoutes);
app.use("/auth", authRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/transfer", csrfProtection, authMiddleware.requireAuth, transferRoute); // csrfProtection bảo vệ khỏi tân công CSRF > phải nằm dưới bodyParser
app.use(express.static("public")); // khai báo public là nơi lưu trữ file tĩnh cho phép truy cập vào theo đường dẫn đến file để xem file trên browser

// get thì trả về cái gì
app.get("/", function (req, res) {
  res.cookie("user-id", 12345); // truy cập vào trang chủ thì send cho client cookie
  res.render("index", { message: "Xin chaò" }); // truyền biến { name: "AAA" } vào file pug
});

app.use("/api", apiProductRoute);
