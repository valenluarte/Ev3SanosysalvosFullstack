import React, { useState } from 'react';

function FiltrosBusqueda({ onFiltrar }) {
  const [filtros, setFiltros] = useState({
    tipo: '',
    estado: '',
    sexo: ''
  });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (onFiltrar) onFiltrar(filtros);
  };

  const limpiarFiltros = () => {
    setFiltros({ tipo: '', estado: '', sexo: '' });
    if (onFiltrar) onFiltrar({ tipo: '', estado: '', sexo: '' });
  };

  return (
    <div>
      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>🔍 Filtros</h3>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#495057' }}>
          Tipo de mascota
        </label>
        <select
          name="tipo"
          value={filtros.tipo}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            backgroundColor: 'white'
          }}
        >
          <option value="">Todos</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Ave">Ave</option>
          <option value="Conejo">Conejo</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#495057' }}>
          Estado
        </label>
        <select
          name="estado"
          value={filtros.estado}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            backgroundColor: 'white'
          }}
        >
          <option value="">Todos</option>
          <option value="PERDIDA">Perdida</option>
          <option value="ENCONTRADA">Encontrada</option>
        </select>
      </div>

      {/* NUEVO: Filtro por Sexo (en lugar de Tamaño) */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#495057' }}>
          Sexo
        </label>
        <select
          name="sexo"
          value={filtros.sexo}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            backgroundColor: 'white'
          }}
        >
          <option value="">Todos</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Aplicar filtros
        </button>
        <button
          onClick={limpiarFiltros}
          style={{
            padding: '12px 20px',
            backgroundColor: '#e9ecef',
            color: '#2c3e50',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}

export default FiltrosBusqueda;