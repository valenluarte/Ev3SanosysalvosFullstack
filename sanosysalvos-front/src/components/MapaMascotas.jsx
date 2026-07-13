import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
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

  const getCoords = (r) => [Number(r.latitud), Number(r.longitud)];

  const reportesMap = new Map(reportes.map(r => [r.id, r]));

  const getColor = (score) => {
    if (!score) return "gray";
    if (score >= 80) return "green";
    if (score >= 50) return "orange";
    return "red";
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>  {/* ← CAMBIADO A 100% */}
      <MapContainer 
        center={[-33.45, -70.66]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {reportes.map((r) => (
          <Marker key={r.id} position={getCoords(r)} icon={createMarkerIcon(r.estado)}>
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <strong>🐾 {r.tipoMascota || "No especificado"}</strong>
                <hr style={{ margin: "4px 0" }} />
                <div><strong>Nombre:</strong> {r.nombreMascota || "Sin nombre"}</div>
                <div><strong>Raza:</strong> {r.raza || "No especificada"}</div>
                <div><strong>Color:</strong> {r.color || "No especificado"}</div>
                <div><strong>Sexo:</strong> {r.sexo || "No especificado"}</div>
                <div><strong>Estado:</strong> {r.estado || "No especificado"}</div>
                {r.descripcion && (
                  <div><strong>Descripción:</strong> {r.descripcion}</div>
                )}
                {r.direccionReferencia && (
                  <div><strong>Ubicación:</strong> {r.direccionReferencia}</div>
                )}
                {r.nombreContacto && (
                  <div><strong>Contacto:</strong> {r.nombreContacto}</div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {matches.map((m, i) => {
          const a = reportesMap.get(m.perdidaId);
          const b = reportesMap.get(m.encontradaId);
          if (!a || !b) return null;
          return (
            <Polyline
              key={i}
              positions={[getCoords(a), getCoords(b)]}
              color={getColor(m.score)}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapaMascotas;