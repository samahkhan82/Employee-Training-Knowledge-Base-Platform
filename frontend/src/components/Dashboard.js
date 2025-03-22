// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  

  const styles = {
    header: {
      width: "100%",
      padding: "20px",
      backgroundColor: "#007bff",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
    uploadButton: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    feedbackButton: {
      backgroundColor: "#ffc107",
      color: "#333",
    },
    logoutButton: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
    content: {
      marginTop: "100px",
      padding: "20px",
    },
    documentList: {
      padding: "20px",
    },
    documentItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #eee",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
    },
  };

  return (
    <div>
      <div style={styles.header}>
        <h2>Dashboard</h2>
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.uploadButton }}
            onClick={() => navigate("/upload")}
          >
            Upload Document
          </button>
          <button
            style={{ ...styles.button, ...styles.feedbackButton }}
            onClick={() => navigate("/feedback")}
          >
            Give Feedback
          </button>
          <button
            style={{ ...styles.button, ...styles.logoutButton }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Uploaded Documents Section */}
      <div style={styles.content}>
        <h3>Uploaded Documents</h3>
        <ul style={styles.documentList}>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <li key={doc._id} style={styles.documentItem}>
                <span>{doc.name}</span>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  View
                </a>
              </li>
            ))
          ) : (
            <p>No documents uploaded yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
