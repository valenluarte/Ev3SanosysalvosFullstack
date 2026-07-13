import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PanelLateral() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarMatches = async () => {
    setCargando(true);
    try {
      const res = await axios.get("http://localhost:8084/api/v1/mapa/matches");
      console.log("Matches recibidos:", res.data);
      setMatches(res.data || []);
    } catch (e) {
      console.error("Error al cargar matches:", e);
      setMatches([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarMatches();
  }, []);

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

      {/* SECCIÓN DE COINCIDENCIAS */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "18px", margin: "0" }}>🔗 Coincidencias</h3>
          <button
            onClick={cargarMatches}
            style={{
              padding: "4px 12px",
              backgroundColor: "#e9ecef",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            🔄 Actualizar
          </button>
        </div>

        {cargando && <p style={{ color: "#6c757d", fontSize: "14px" }}>Buscando coincidencias...</p>}

        {!cargando && matches.length === 0 && (
          <p style={{ color: "#6c757d", fontSize: "14px" }}>No hay coincidencias aún</p>
        )}

        {matches.map((match, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f8f9fa",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
              borderLeft: `4px solid ${match.scoreTotal >= 80 ? "#28a745" : match.scoreTotal >= 60 ? "#fd7e14" : "#dc3545"}`
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: "14px" }}>
                {match.scoreTotal >= 80 ? "🟢" : match.scoreTotal >= 60 ? "🟠" : "🔴"}
                {" "}{Math.round(match.scoreTotal)}% coincidencia
              </strong>
              <span style={{ fontSize: "12px", color: "#6c757d" }}>
                {match.distanciaKm?.toFixed(1)} km
              </span>
            </div>
            <div style={{ fontSize: "13px", marginTop: "4px" }}>
              <span>Perdida ID: {match.idPerdida}</span>
              <span style={{ marginLeft: "12px" }}>→</span>
              <span style={{ marginLeft: "12px" }}>Encontrada ID: {match.idEncontrada}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelLateral;