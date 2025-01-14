import React, { useState } from "react";

const MicrophoneAccess = () => {
  const [permission, setPermission] = useState(null); // "granted", "denied", "prompt", or null
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);

  const requestMicrophoneAccess = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission("granted");
      setStream(mediaStream);
      setErrorMessage("");
    } catch (error) {
      if (error.name === "NotAllowedError") {
        setPermission("denied");
        setErrorMessage("Access to the microphone was denied.");
      } else if (error.name === "NotFoundError") {
        setPermission("denied");
        setErrorMessage("No microphone device found.");
      } else {
        setPermission("denied");
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Microphone Access</h2>
      <p style={styles.description}>
        To proceed, we need access to your microphone. Click the button below to grant permissions.
      </p>
      {permission === "granted" ? (
        <p style={styles.success}>🎉 Microphone access granted!</p>
      ) : (
        <button
          style={styles.button}
          onClick={requestMicrophoneAccess}
          disabled={permission === "denied"}
        >
          {permission === "denied" ? "Access Denied" : "Allow Microphone Access"}
        </button>
      )}
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {stream && <p style={styles.success}>Streaming audio...</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  success: {
    fontSize: "1rem",
    color: "#28a745",
    marginTop: "10px",
  },
  error: {
    fontSize: "0.9rem",
    color: "#dc3545",
    marginTop: "10px",
  },
};

export default MicrophoneAccess;
