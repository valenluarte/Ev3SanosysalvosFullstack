import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Reportar from './pages/Reportar';
import ReporteDetalle from './pages/ReporteDetalle';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <nav style={{
          backgroundColor: '#2c3e50',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
            🐾 Sanos y Salvos
          </h2>
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>🏠 Inicio</Link>
            <Link to="/reportar" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>📝 Reportar</Link>
          </div>
        </nav>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reportar" element={<Reportar />} />
            <Route path="/reporte/:id" element={<ReporteDetalle />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;