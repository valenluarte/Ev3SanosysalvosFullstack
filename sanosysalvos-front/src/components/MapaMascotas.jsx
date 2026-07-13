import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const getMarkerColor = (estado) => {
  if (estado === "PERDIDA") return "red";
  if (estado === "ENCONTRADA") return "gold";
  return "gray";
};

const createMarkerIcon = (estado) => {
  const color = getMarkerColor(estado);
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

function MapaMascotas({ reportes = [], matches = [] }) {
  const navigate = useNavigate();
  const getCoords = (r) => [Number(r.latitud), Number(r.longitud)];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={[-33.45, -70.66]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {reportes.map((r) => (
          <Marker
            key={r.id}
            position={getCoords(r)}
            icon={createMarkerIcon(r.estado)}
          >
            <Popup closeButton={true} autoPan={false}>
              <div style={{ minWidth: "200px", padding: "4px" }}>
                {/* ✅ Foto de la mascota (si existe) */}
                {r.urlFoto && (
                  <img
                    src={r.urlFoto}
                    alt={r.nombreMascota || "Mascota"}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      marginBottom: "8px"
                    }}
                  />
                )}
                <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                  🐾 {r.tipoMascota || "No especificado"}
                </div>
                <hr style={{ margin: "4px 0" }} />
                <div><strong>Nombre:</strong> {r.nombreMascota || "Sin nombre"}</div>
                <div><strong>Raza:</strong> {r.raza || "No especificada"}</div>
                <div><strong>Color:</strong> {r.color || "No especificado"}</div>
                <div><strong>Sexo:</strong> {r.sexo || "No especificado"}</div>
                <div><strong>Estado:</strong> {r.estado || "No especificado"}</div>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => navigate(`/reporte/${r.id}`)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#2c3e50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    📖 Ver detalle
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapaMascotas;