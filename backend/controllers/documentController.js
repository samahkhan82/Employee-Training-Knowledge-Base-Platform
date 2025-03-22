// backend/controllers/documentController.js
const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  try {
    const { title, category, uploadedBy } = req.body;
    const fileUrl = req.file ? req.file.path : "";

    const document = new Document({ title, fileUrl, category, uploadedBy });
    await document.save();
    res
      .status(201)
      .json({ message: "Document uploaded successfully", document });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Document upload failed", error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch documents", error: err.message });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    res.status(200).json(document);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching document", error: err.message });
  }
};
