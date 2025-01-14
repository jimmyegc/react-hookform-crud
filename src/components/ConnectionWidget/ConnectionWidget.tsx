import React, { useEffect, useState } from "react";

const ConnectionWidget = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [audioPermission, setAudioPermission] = useState(null);
  const [quality, setQuality] = useState("Unknown");
  const [signalStrength, setSignalStrength] = useState("Unknown");

  useEffect(() => {
    // Handle online/offline status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Check audio permissions
    navigator.permissions
      .query({ name: "microphone" })
      .then((result) => setAudioPermission(result.state));

    // Fetch WebRTC stats (if applicable)
    let interval;
    if (window.RTCPeerConnection) {
      const connection = new RTCPeerConnection();
      interval = setInterval(() => {
        connection.getStats(null).then((stats) => {
          stats.forEach((report) => {
            if (report.type === "inbound-rtp" && report.kind === "audio") {
              setQuality(report.jitter ? `Jitter: ${report.jitter}` : "Good");
              setSignalStrength(
                report.packetsLost > 0
                  ? `Packets Lost: ${report.packetsLost}`
                  : "Strong"
              );
            }
          });
        });
      }, 2000);
    }

    // Cleanup
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div style={styles.widget}>
      <h3>Connection Status</h3>
      <div style={styles.row}>
        <span>Online:</span>
        <span>{isOnline ? "Yes" : "No"}</span>
      </div>
      <div style={styles.row}>
        <span>Audio Permission:</span>
        <span>{audioPermission}</span>
      </div>
      <div style={styles.row}>
        <span>Quality:</span>
        <span>{quality}</span>
      </div>
      <div style={styles.row}>
        <span>Signal Strength:</span>
        <span>{signalStrength}</span>
      </div>
    </div>
  );
};

const styles = {
  widget: {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "300px",
    backgroundColor: "#f9f9f9",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
};

export default ConnectionWidget;
