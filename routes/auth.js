const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/api/auth");
const { auth } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
