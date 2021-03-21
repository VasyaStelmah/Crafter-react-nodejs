const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipes");

router.get("/getAll", controller.getAll);
router.get("/:id", controller.getById);
router.patch("/:id", controller.updateById);
router.delete("/:id", controller.removeById);
router.post("/", controller.create);

module.exports = router;
