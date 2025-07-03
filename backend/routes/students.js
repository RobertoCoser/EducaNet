const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, studentsController.getAllStudents);
router.post("/", authenticateToken, studentsController.createStudent);
router.put("/:id", authenticateToken, studentsController.updateStudent);
router.delete("/:id", authenticateToken, studentsController.deleteStudent);

module.exports = router;