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
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>← Volver al mapa</Link>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        {reporte.urlFoto ? (
          <img
            src={reporte.urlFoto}
            alt={reporte.nombreMascota || 'Mascota'}
            style={{
              width: '100%',
              maxWidth: '500px',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '250px',
            backgroundColor: '#e9ecef',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '18px',
            color: '#6c757d'
          }}>
            📷 Sin foto
          </div>
        )}
      </div>

      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
        🐾 {reporte.nombreMascota || 'Sin nombre'}
      </h1>

      <div style={{
        backgroundColor: reporte.estado === 'PERDIDA' ? '#fff5f5' : '#f0fff4',
        padding: '10px 16px',
        borderRadius: '8px',
        display: 'inline-block',
        marginBottom: '20px',
        border: `1px solid ${reporte.estado === 'PERDIDA' ? '#dc3545' : '#28a745'}`
      }}>
        <strong style={{ color: reporte.estado === 'PERDIDA' ? '#dc3545' : '#28a745' }}>
          {reporte.estado === 'PERDIDA' ? '🔴 Perdida' : '🟢 Encontrada'}
        </strong>
      </div>

      <hr />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <p><strong>Tipo:</strong> {reporte.tipoMascota}</p>
        <p><strong>Raza:</strong> {reporte.raza || 'No especificada'}</p>
        <p><strong>Color:</strong> {reporte.color}</p>
        <p><strong>Sexo:</strong> {reporte.sexo || 'No especificado'}</p>
        <p><strong>Tamaño:</strong> {reporte.tamano || 'No especificado'}</p>
        <p><strong>Edad:</strong> {reporte.edad || 'No especificada'}</p>
      </div>

      <hr />

      <div>
        <h3>📍 Ubicación</h3>
        <p>{reporte.direccionReferencia || 'No especificada'}</p>
        <p><small>Lat: {reporte.latitud}, Lon: {reporte.longitud}</small></p>
      </div>

      {reporte.descripcion && (
        <>
          <hr />
          <div>
            <h3>📝 Descripción</h3>
            <p>{reporte.descripcion}</p>
          </div>
        </>
      )}

      <hr />

      <div>
        <h3>📞 Contacto</h3>
        <p><strong>Nombre:</strong> {reporte.nombreContacto || 'No especificado'}</p>
        <p><strong>Teléfono:</strong> {reporte.telefonoContacto || 'No especificado'}</p>
        {reporte.emailContacto && <p><strong>Email:</strong> {reporte.emailContacto}</p>}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link to="/" style={{
          padding: '10px 30px',
          backgroundColor: '#2c3e50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px'
        }}>
          Volver al mapa
        </Link>
      </div>
    </div>
  );
}

export default ReporteDetalle;