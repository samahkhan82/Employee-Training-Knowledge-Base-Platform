// backend/models/Document.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: String,
  fileUrl: String,
  category: String,
  uploadedBy: String,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
