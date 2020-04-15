const express = require("express");
const router = express.Router();
const { getOne, update, deleteOne } = require("../controllers/api/profile");

router.get("/", getOne);
router.put("/", update);
router.delete("/", deleteOne);

module.exports = router;
