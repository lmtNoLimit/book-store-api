const express = require("express");
const router = express.Router();
const {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
} = require("../controllers/api/book");
const upload = require("../middlewares/multer");

router.get("/", getMany);
router.post("/", upload.any(), create);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", deleteOne);

module.exports = router;
