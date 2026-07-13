import React from "react";
import { useNavigate } from "react-router-dom";

function PanelLateral() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "340px",
      minWidth: "340px",
      height: "100vh",
      backgroundColor: "#ffffff",
      borderRight: "2px solid #e9ecef",
      padding: "24px",
      overflowY: "auto",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 1000
    }}>
      <h2 style={{ marginTop: 0, fontSize: "24px", color: "#2c3e50" }}>
        🐾 Sanos y Salvos
      </h2>
      <p style={{ fontSize: "16px", color: "#6c757d" }}>
        Encuentra o reporta mascotas
      </p>

      <hr style={{ margin: "16px 0" }} />

      <button
        onClick={() => navigate("/reportar", { state: { tipo: "PERDIDA" } })}
        style={{
          width: "100%",
          padding: "16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "12px"
        }}
      >
        🔴 Reportar perdida
      </button>

      <button
        onClick={() => navigate("/reportar", { state: { tipo: "ENCONTRADA" } })}
        style={{
          width: "100%",
          padding: "16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "12px"
        }}
      >
        🟢 Reportar encontrada
      </button>

      <hr style={{ margin: "16px 0" }} />
    </div>
  );
}

export default PanelLateral;