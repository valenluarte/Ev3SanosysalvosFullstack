import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ReporteDetalle() {
  const { id } = useParams();
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8083/api/v1/reports/${id}`)
      .then(res => {
        setReporte(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  if (cargando) return <div style={{ padding: '40px' }}>Cargando...</div>;
  if (!reporte) return <div style={{ padding: '40px' }}>Reporte no encontrado</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>← Volver al mapa</Link>
      <h1>🐾 {reporte.nombreMascota || 'Sin nombre'}</h1>
      <hr />
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <p><strong>Estado:</strong> {reporte.estado}</p>
          <p><strong>Tipo:</strong> {reporte.tipoMascota}</p>
          <p><strong>Raza:</strong> {reporte.raza || 'No especificada'}</p>
          <p><strong>Color:</strong> {reporte.color}</p>
          <p><strong>Sexo:</strong> {reporte.sexo || 'No especificado'}</p>
          <p><strong>Tamaño:</strong> {reporte.tamano || 'No especificado'}</p>
          <p><strong>Edad:</strong> {reporte.edad || 'No especificada'}</p>
          <p><strong>Descripción:</strong> {reporte.descripcion || 'Sin descripción'}</p>
          <p><strong>Ubicación:</strong> {reporte.direccionReferencia || 'No especificada'}</p>
        </div>
        <div>
          {reporte.urlFoto ? (
            <img src={reporte.urlFoto} alt="Mascota" style={{ width: '250px', borderRadius: '8px' }} />
          ) : (
            <div style={{ width: '250px', height: '200px', backgroundColor: '#e9ecef', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📷 Sin foto
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReporteDetalle;