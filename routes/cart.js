const express = require("express");
const router = express.Router();
const { getCart, addToCart } = require("../controllers/api/cart");

router.get("/", getCart);
router.post("/:bookId", addToCart);

module.exports = router;
