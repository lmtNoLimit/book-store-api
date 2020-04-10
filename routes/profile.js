const express = require("express");
const router = express.Router();
const { show, update, deleteOne } = require("../controllers/api/profile");

router.get("/", show);
router.put("/", update);
router.delete("/", deleteOne);

module.exports = router;
