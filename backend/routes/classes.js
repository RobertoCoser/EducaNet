const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classesController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, classesController.getAllClasses);
router.post("/", authenticateToken, classesController.createClass);
router.put("/:id", authenticateToken, classesController.updateClass);
router.delete("/:id", authenticateToken, classesController.deleteClass);

module.exports = router;
