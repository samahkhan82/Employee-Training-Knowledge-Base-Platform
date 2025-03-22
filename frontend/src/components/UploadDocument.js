// frontend/src/components/UploadDocument.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadDocument() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("file", file);

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Document uploaded successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to upload document", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Document</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default UploadDocument;
