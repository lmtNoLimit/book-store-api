const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/api/cart");

router.post("/:bookId", addToCart);

module.exports = router;
