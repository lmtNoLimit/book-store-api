const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/api", (req, res) => {
  res.json({
    message: "Welcome to book store API",
  });
});

module.exports = router;
