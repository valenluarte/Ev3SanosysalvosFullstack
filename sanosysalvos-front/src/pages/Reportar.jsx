import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormularioReporte from '../components/FormularioReporte';

function Reportar() {
  const navigate = useNavigate();
  const location = useLocation();
  const tipoInicial = location.state?.tipo || 'PERDIDA';
  const [tipoActivo, setTipoActivo] = useState(tipoInicial);

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      height: 'calc(100vh - 80px)',
      overflowY: 'auto'
    }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px', textAlign: 'center' }}>
        📝 Reportar mascota
      </h1>

      {/* Tabs para seleccionar el tipo de reporte */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
        <button
          onClick={() => setTipoActivo('PERDIDA')}
          style={{
            flex: 1,
            padding: '14px',
            backgroundColor: tipoActivo === 'PERDIDA' ? '#dc3545' : '#f8f9fa',
            color: tipoActivo === 'PERDIDA' ? 'white' : '#2c3e50',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          🔴 Perdida
        </button>
        <button
          onClick={() => setTipoActivo('ENCONTRADA')}
          style={{
            flex: 1,
            padding: '14px',
            backgroundColor: tipoActivo === 'ENCONTRADA' ? '#28a745' : '#f8f9fa',
            color: tipoActivo === 'ENCONTRADA' ? 'white' : '#2c3e50',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          🟢 Encontrada
        </button>
      </div>

      {/* Formulario según el tipo activo */}
      <FormularioReporte
        tipo={tipoActivo}
        onReporteCreado={() => {
          navigate('/');
        }}
        onCancelar={() => {
          navigate('/');
        }}
      />
    </div>
  );
}

export default Reportar;