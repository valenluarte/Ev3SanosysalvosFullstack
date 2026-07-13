import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Reportar from './pages/Reportar';
import ReporteDetalle from './pages/ReporteDetalle';
import CompararReportes from './pages/CompararReportes';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <nav style={{
          backgroundColor: '#2c3e50',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          zIndex: 1001
        }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>
            🐾 Sanos y Salvos
          </h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>
              🏠 Inicio
            </Link>
            <Link to="/reportar" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>
              📝 Reportar
            </Link>
          </div>
        </nav>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reportar" element={<Reportar />} />
            <Route path="/reporte/:id" element={<ReporteDetalle />} />
            <Route path="/comparar/:idPerdida/:idEncontrada" element={<CompararReportes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;