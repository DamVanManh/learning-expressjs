var express = require("express");

var controller = require("../controllers/products.controller");

var router = express.Router();

router.get("/products", controller.products);
router.get("/products/:id", controller.getOneProduct);
router.post("/products", controller.create);

module.exports = router;
