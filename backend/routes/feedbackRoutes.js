// backend/routes/feedbackRoutes.js
const express = require("express");
const {
  submitFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, submitFeedback);
router.get("/", authMiddleware, getFeedback);

module.exports = router;
