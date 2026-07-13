import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CompararReportes() {
  const { idPerdida, idEncontrada } = useParams();
  const [perdida, setPerdida] = useState(null);
  const [encontrada, setEncontrada] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarReportes = async () => {
      try {
        const [resPerdida, resEncontrada] = await Promise.all([
          axios.get(`http://localhost:8083/api/v1/reports/${idPerdida}`),
          axios.get(`http://localhost:8083/api/v1/reports/${idEncontrada}`)
        ]);
        setPerdida(resPerdida.data);
        setEncontrada(resEncontrada.data);
      } catch (e) {
        console.error("Error al cargar reportes:", e);
      }
      setCargando(false);
    };
    cargarReportes();
  }, [idPerdida, idEncontrada]);

  if (cargando) return <div style={{ padding: "40px" }}>Cargando...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#2c3e50", textDecoration: "none" }}>← Volver al mapa</Link>
      <h1 style={{ textAlign: "center", fontSize: "24px", margin: "20px 0" }}>🔗 Comparación de reportes</h1>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* Reporte Perdida */}
        <div style={{ flex: 1, backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", borderTop: "4px solid #dc3545" }}>
          <h2 style={{ color: "#dc3545", fontSize: "18px" }}>🔴 Perdida</h2>
          <hr />

          {/* Foto de la mascota perdida */}
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            {perdida?.urlFoto ? (
              <img
                src={perdida.urlFoto}
                alt={perdida.nombreMascota || "Mascota"}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid #dc3545"
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                maxWidth: "250px",
                height: "150px",
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                color: "#6c757d",
                fontSize: "14px"
              }}>
                📷 Sin foto
              </div>
            )}
          </div>

          <p><strong>Nombre:</strong> {perdida?.nombreMascota || "Sin nombre"}</p>
          <p><strong>Tipo:</strong> {perdida?.tipoMascota}</p>
          <p><strong>Raza:</strong> {perdida?.raza || "No especificada"}</p>
          <p><strong>Color:</strong> {perdida?.color}</p>
          <p><strong>Sexo:</strong> {perdida?.sexo || "No especificado"}</p>
          <p><strong>Tamaño:</strong> {perdida?.tamano || "No especificado"}</p>
          <p><strong>Edad:</strong> {perdida?.edad || "No especificada"}</p>
          <p><strong>Ubicación:</strong> {perdida?.direccionReferencia || "No especificada"}</p>
          <p><strong>Contacto:</strong> {perdida?.nombreContacto || "No especificado"}</p>
        </div>

        {/* Reporte Encontrada */}
        <div style={{ flex: 1, backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", borderTop: "4px solid #28a745" }}>
          <h2 style={{ color: "#28a745", fontSize: "18px" }}>🟢 Encontrada</h2>
          <hr />

          {/* Foto de la mascota encontrada */}
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            {encontrada?.urlFoto ? (
              <img
                src={encontrada.urlFoto}
                alt={encontrada.nombreMascota || "Mascota"}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid #28a745"
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                maxWidth: "250px",
                height: "150px",
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                color: "#6c757d",
                fontSize: "14px"
              }}>
                📷 Sin foto
              </div>
            )}
          </div>

          <p><strong>Nombre:</strong> {encontrada?.nombreMascota || "Sin nombre"}</p>
          <p><strong>Tipo:</strong> {encontrada?.tipoMascota}</p>
          <p><strong>Raza:</strong> {encontrada?.raza || "No especificada"}</p>
          <p><strong>Color:</strong> {encontrada?.color}</p>
          <p><strong>Sexo:</strong> {encontrada?.sexo || "No especificado"}</p>
          <p><strong>Tamaño:</strong> {encontrada?.tamano || "No especificado"}</p>
          <p><strong>Edad:</strong> {encontrada?.edad || "No especificada"}</p>
          <p><strong>Ubicación:</strong> {encontrada?.direccionReferencia || "No especificada"}</p>
          <p><strong>Contacto:</strong> {encontrada?.nombreContacto || "No especificado"}</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/" style={{
          padding: "10px 30px",
          backgroundColor: "#2c3e50",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px"
        }}>
          Volver al mapa
        </Link>
      </div>
    </div>
  );
}

export default CompararReportes;