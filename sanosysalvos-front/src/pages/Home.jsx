import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapaMascotas from '../components/MapaMascotas';
import FiltrosBusqueda from '../components/FiltrosBusqueda';

function Home() {
  const [reportes, setReportes] = useState([]);
  const [reportesFiltrados, setReportesFiltrados] = useState([]);
  const [matches, setMatches] = useState([]);

  const cargarReportes = async () => {
    try {
      const res = await axios.get('http://localhost:8084/api/v1/mapa/reportes');
      console.log('Reportes cargados:', res.data);
      setReportes(res.data || []);
      setReportesFiltrados(res.data || []);
    } catch (e) {
      console.error('Error:', e);
      setReportes([]);
      setReportesFiltrados([]);
    }
  };

  const cargarMatches = async () => {
    try {
      const res = await axios.get('http://localhost:8084/api/v1/mapa/matches');
      setMatches(res.data || []);
    } catch (e) {
      setMatches([]);
    }
  };

  const aplicarFiltros = (filtros) => {
  console.log('Aplicando filtros:', filtros);
  let filtrados = [...reportes];

  if (filtros.tipo) {
    filtrados = filtrados.filter(r => r.tipoMascota === filtros.tipo);
  }
  if (filtros.estado) {
    filtrados = filtrados.filter(r => r.estado === filtros.estado);
  }
  if (filtros.sexo) {
    filtrados = filtrados.filter(r => r.sexo === filtros.sexo);
  }

  console.log('Filtrados:', filtrados);
  setReportesFiltrados(filtrados);
};

  useEffect(() => {
    cargarReportes();
    cargarMatches();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{
        width: '340px',
        minWidth: '340px',
        backgroundColor: '#ffffff',
        padding: '24px',
        overflowY: 'auto',
        borderRight: '2px solid #e9ecef',
        height: '100%'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '22px', color: '#2c3e50' }}>
          🐾 Sanos y Salvos
        </h2>
        <FiltrosBusqueda onFiltrar={aplicarFiltros} />
        <hr style={{ margin: '16px 0' }} />
        <div>
          <h3 style={{ fontSize: '18px' }}>📊 Resumen</h3>
          <p style={{ fontSize: '16px' }}>🐾 Perdidas: {reportes.filter(r => r.estado === 'PERDIDA').length}</p>
          <p style={{ fontSize: '16px' }}>🟡 Encontradas: {reportes.filter(r => r.estado === 'ENCONTRADA').length}</p>
        </div>
      </div>
      <div style={{ flex: 1, height: '100%' }}>
        <MapaMascotas reportes={reportesFiltrados} matches={matches} />
      </div>
    </div>
  );
}

export default Home;