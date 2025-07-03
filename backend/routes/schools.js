const express = require("express");
const router = express.Router();
const schoolsController = require("../controllers/schoolsController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, schoolsController.getAllSchools);
router.post("/", authenticateToken, schoolsController.createSchool);
router.put("/:id", authenticateToken, schoolsController.updateSchool);
router.delete("/:id", authenticateToken, schoolsController.deleteSchool);

module.exports = router;