// backend/routes/documentRoutes.js

const express = require("express");
const multer = require("multer");
const {
  uploadDocument,
  getDocuments,
  getDocumentById,
} = require("../controllers/documentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Store files in 'uploads' folder

router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);
router.get("/", authMiddleware, getDocuments);
router.get("/:id", authMiddleware, getDocumentById);

module.exports = router;
