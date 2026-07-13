import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapaMascotas from '../components/MapaMascotas';
import FiltrosBusqueda from '../components/FiltrosBusqueda';
import PanelMatches from '../components/PanelMatches';

function Home() {
  const [reportes, setReportes] = useState([]);
  const [reportesFiltrados, setReportesFiltrados] = useState([]);
  const [matches, setMatches] = useState([]);

  const cargarReportes = async () => {
    try {
      const res = await axios.get('http://localhost:8084/api/v1/mapa/reportes');
      setReportes(res.data || []);
      setReportesFiltrados(res.data || []);
    } catch (e) {
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
    setReportesFiltrados(filtrados);
  };

  useEffect(() => {
    cargarReportes();
    cargarMatches();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{
        width: '300px',
        minWidth: '300px',
        backgroundColor: '#ffffff',
        padding: '20px',
        overflowY: 'auto',
        borderRight: '2px solid #e9ecef',
        height: '100%'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>🐾 Sanos y Salvos</h2>
        <FiltrosBusqueda onFiltrar={aplicarFiltros} />
        <hr />
        <div>
          <h4>📊 Resumen</h4>
          <p>🐾 Perdidas: {reportes.filter(r => r.estado === 'PERDIDA').length}</p>
          <p>🟡 Encontradas: {reportes.filter(r => r.estado === 'ENCONTRADA').length}</p>
        </div>
      </div>

      <div style={{ flex: 1, height: '100%' }}>
        <MapaMascotas reportes={reportesFiltrados} matches={matches} />
      </div>

      <PanelMatches />
    </div>
  );
}

export default Home;