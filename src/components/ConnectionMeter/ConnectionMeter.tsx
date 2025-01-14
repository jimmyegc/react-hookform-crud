import React, { useEffect, useState } from "react";
import "./ConnectionMeter.css";

const ConnectionMeter = () => {
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const updateConnectionInfo = () => {
      const info = {
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
      };
      setConnectionInfo(info);

      // Mostrar alerta si la conexión es inestable
      setShowAlert(info.effectiveType === "2g" || info.effectiveType === "slow-2g");
    };

    if (connection) {
      updateConnectionInfo();
      connection.addEventListener("change", updateConnectionInfo);

      return () => {
        connection.removeEventListener("change", updateConnectionInfo);
      };
    }
  }, []);

  const getSignalBars = () => {
    if (!connectionInfo) return 0;
    const { effectiveType } = connectionInfo;

    switch (effectiveType) {
      case "4g":
        return 4; // Excelente conexión
      case "3g":
        return 3; // Buena conexión
      case "2g":
        return 2; // Baja conexión
      case "slow-2g":
        return 1; // Conexión muy lenta
      default:
        return 0; // Sin conexión
    }
  };

  const signalBars = getSignalBars();

  return (
    <div className="connection-meter">
      <div className="signal-bars">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`bar ${i < signalBars ? "active" : ""}`}
            style={{ height: `${(i + 1) * 25}%` }}
          ></div>
        ))}
      </div>
      <div className="connection-info">
        {connectionInfo ? (
          <>
            <p><strong>{connectionInfo.effectiveType.toUpperCase()}</strong></p>
            <p>{connectionInfo.downlink} Mbps</p>
          </>
        ) : (
          <p>Sin conexión</p>
        )}
      </div>
      {showAlert && (
        <div className="alert">
          <span role="img" aria-label="alert">⚠️</span> Conexión inestable
        </div>
      )}
    </div>
  );
};

export default ConnectionMeter;
