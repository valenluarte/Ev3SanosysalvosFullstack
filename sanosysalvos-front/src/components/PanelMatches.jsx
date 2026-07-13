import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PanelMatches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarMatches = async () => {
    setCargando(true);
    try {
      const res = await axios.get("http://localhost:8084/api/v1/mapa/matches");
      console.log("Matches desde BFF:", res.data);
      setMatches(res.data || []);
    } catch (e) {
      console.error("Error al cargar matches:", e);
      setMatches([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarMatches();
    const interval = setInterval(cargarMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const matchesFiltrados = matches.filter(m => m.scoreTotal >= 60);
  const matchesOrdenados = [...matchesFiltrados].sort((a, b) => b.scoreTotal - a.scoreTotal);
  const matchesTop = matchesOrdenados.slice(0, 5);

  return (
    <div style={{
      width: "280px",
      minWidth: "280px",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      borderLeft: "2px solid #e9ecef",
      padding: "16px",
      overflowY: "auto",
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h4 style={{ fontSize: "16px", margin: "0" }}>🔗 Coincidencias</h4>
        <button
          onClick={cargarMatches}
          style={{
            padding: "2px 10px",
            backgroundColor: "#e9ecef",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "11px"
          }}
        >
          🔄
        </button>
      </div>

      {cargando && <p style={{ color: "#6c757d", fontSize: "13px" }}>Buscando...</p>}

      {!cargando && matchesTop.length === 0 && (
        <p style={{ color: "#6c757d", fontSize: "13px" }}>No hay coincidencias relevantes</p>
      )}

      {matchesTop.map((match, index) => (
        <div
          key={index}
          onClick={() => navigate(`/comparar/${match.idPerdida}/${match.idEncontrada}`)}
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "8px",
            borderLeft: `4px solid ${match.scoreTotal >= 80 ? "#28a745" : "#fd7e14"}`,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ fontSize: "13px" }}>
              {match.scoreTotal >= 80 ? "🟢" : "🟠"}
              {" "}{Math.round(match.scoreTotal)}%
            </strong>
            <span style={{ fontSize: "11px", color: "#6c757d" }}>
              {match.distanciaKm?.toFixed(1)} km
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "#495057", marginTop: "2px" }}>
            Perdida #{match.idPerdida} → Encontrada #{match.idEncontrada}
          </div>
          <div style={{ fontSize: "11px", color: "#6c757d", marginTop: "2px" }}>
            👆 Click para comparar
          </div>
        </div>
      ))}
    </div>
  );
}

export default PanelMatches;