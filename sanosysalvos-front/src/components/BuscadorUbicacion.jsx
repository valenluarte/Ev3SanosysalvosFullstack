import React, { useState, useEffect, useRef } from "react";
import { geocodeAddress } from "../services/GeocodingService";

function BuscadorUbicacion({ onUbicacionSeleccionada, placeholder = "Buscar dirección..." }) {
  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [seleccion, setSeleccion] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setSeleccion(null);

    if (value.length > 2) {
      setCargando(true);
      const resultados = await geocodeAddress(value);
      setSugerencias(resultados);
      setMostrarSugerencias(true);
      setCargando(false);
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  };

  const handleSeleccionar = (sugerencia) => {
    setQuery(sugerencia.displayName);
    setSeleccion(sugerencia);
    setMostrarSugerencias(false);
    if (onUbicacionSeleccionada) {
      onUbicacionSeleccionada({
        lat: sugerencia.lat,
        lon: sugerencia.lon,
        displayName: sugerencia.displayName
      });
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 2 && setMostrarSugerencias(true)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "8px",
            border: "2px solid #ced4da",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.3s"
          }}
        />
        {cargando && <span style={{ color: "#6c757d" }}>⌛</span>}
      </div>

      {mostrarSugerencias && sugerencias.length > 0 && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          marginTop: "4px",
          maxHeight: "250px",
          overflowY: "auto",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}>
          {sugerencias.map((sug, index) => (
            <div
              key={index}
              onClick={() => handleSeleccionar(sug)}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: "1px solid #f1f3f5",
                fontSize: "14px"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f1f3f5"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              <div style={{ fontWeight: "500" }}>
                {sug.displayName.split(",")[0]}
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>
                {sug.displayName}
              </div>
            </div>
          ))}
        </div>
      )}

      {seleccion && (
        <div style={{
          marginTop: "8px",
          padding: "8px 12px",
          backgroundColor: "#e8f5e9",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#2e7d32"
        }}>
          ✅ Ubicación seleccionada: {seleccion.displayName}
          <br />
          <small>📌 {seleccion.lat}, {seleccion.lon}</small>
        </div>
      )}
    </div>
  );
}

export default BuscadorUbicacion;