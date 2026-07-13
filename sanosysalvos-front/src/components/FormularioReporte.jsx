import React, { useState } from "react";
import axios from "axios";

// Opciones predefinidas
const COLORES = [
  "Negro", "Blanco", "Gris", "Marrón", "Dorado", "Amarillo",
  "Naranja", "Rojo", "Azul", "Verde", "Atigrado", "Manchado",
  "Bicolor", "Tricolor", "Otro"
];

const RAZAS_PERRO = [
  "Labrador", "Golden Retriever", "Bulldog", "Beagle", "Poodle",
  "Doberman", "Husky", "Pastor Alemán", "Chihuahua", "Dálmata",
  "Otro"
];

const TIPOS_MASCOTA = ["Perro", "Gato", "Ave", "Conejo", "Otro"];

function FormularioReporte({ onReporteCreado, onCancelar, tipo = "PERDIDA" }) {
  const [sinIdentificacion, setSinIdentificacion] = useState(false);

  const [formData, setFormData] = useState({
    tipoMascota: "",
    raza: "",
    color: [],
    sexo: "",
    tamano: "",
    edad: "",
    nombreMascota: "",
    estado: tipo,
    latitud: "",
    longitud: "",
    direccionReferencia: "",
    nombreContacto: "",
    telefonoContacto: "",
    emailContacto: "",
    descripcion: "",
    urlFoto: "",
    lugarEncontrado: "",
    fechaEncontrado: "",
    tieneCollar: false,
    tieneIdentificacion: false,
    estadoSalud: "Bueno"
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarRaza, setMostrarRaza] = useState(false);

  const handleTipoChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, tipoMascota: value });
    setMostrarRaza(value === "Perro");
    if (value !== "Perro") {
      setFormData({ ...formData, tipoMascota: value, raza: "" });
    }
  };

  const handleColorChange = (color) => {
    if (formData.color.includes(color)) {
      setFormData({
        ...formData,
        color: formData.color.filter(c => c !== color)
      });
    } else {
      setFormData({
        ...formData,
        color: [...formData.color, color]
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    if (!formData.tipoMascota || !formData.nombreMascota || !formData.latitud || !formData.longitud) {
      setError("Los campos 'Tipo de mascota', 'Nombre', 'Latitud' y 'Longitud' son obligatorios.");
      setCargando(false);
      return;
    }

    const dataToSend = {
      ...formData,
      latitud: parseFloat(formData.latitud),
      longitud: parseFloat(formData.longitud),
      color: formData.color.join(", "),
      raza: formData.raza || "Sin raza",
      estado: tipo
    };

    try {
      await axios.post("http://localhost:8083/api/v1/reports", dataToSend);
      if (onReporteCreado) onReporteCreado();
    } catch (err) {
      console.error("Error al crear reporte:", err);
      setError("Error al crear el reporte. Inténtalo nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const esEncontrada = tipo === "ENCONTRADA";

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      {/* TÍTULO DINÁMICO */}
      <h3 style={{ marginTop: 0, fontSize: "20px", color: "#2c3e50" }}>
        {esEncontrada ? "📢 Reportar mascota encontrada" : "📝 Reportar mascota perdida"}
      </h3>

      {error && (
        <div style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
          {error}
        </div>
      )}

      {/* Tipo de mascota */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Tipo de mascota *</label>
        <select
          name="tipoMascota"
          value={formData.tipoMascota}
          onChange={handleTipoChange}
          required
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        >
          <option value="">Selecciona...</option>
          {TIPOS_MASCOTA.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Raza (solo para Perro) */}
      {mostrarRaza && (
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Raza</label>
          <select
            name="raza"
            value={formData.raza}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
          >
            <option value="">Selecciona...</option>
            {RAZAS_PERRO.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      )}

      {/* Colores */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Color(es) *</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {COLORES.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => handleColorChange(c)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: formData.color.includes(c) ? "2px solid #28a745" : "1px solid #ced4da",
                backgroundColor: formData.color.includes(c) ? "#d4edda" : "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              {c} {formData.color.includes(c) && "✓"}
            </button>
          ))}
        </div>
        <small style={{ color: "#6c757d" }}>Selecciona uno o más colores</small>
      </div>

      {/* Sexo */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Sexo</label>
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        >
          <option value="">Selecciona...</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      {/* Tamaño */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Tamaño</label>
        <select
          name="tamano"
          value={formData.tamano}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        >
          <option value="">Selecciona...</option>
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>
      </div>

      {/* Edad */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Edad</label>
        <select
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        >
          <option value="">Selecciona...</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Joven">Joven</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Nombre de la mascota */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Nombre de la mascota *</label>
        {!sinIdentificacion ? (
          <input
            type="text"
            name="nombreMascota"
            value={formData.nombreMascota}
            onChange={handleChange}
            placeholder="Ej: Firulais"
            required
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
          />
        ) : (
          <input
            type="text"
            name="nombreMascota"
            value="Sin identificación"
            disabled
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da", backgroundColor: "#f1f3f5" }}
          />
        )}
        <label style={{ fontSize: "14px", marginTop: "4px", display: "block" }}>
          <input
            type="checkbox"
            checked={sinIdentificacion}
            onChange={(e) => {
              setSinIdentificacion(e.target.checked);
              if (e.target.checked) {
                setFormData({ ...formData, nombreMascota: "Sin identificación" });
              } else {
                setFormData({ ...formData, nombreMascota: "" });
              }
            }}
          /> No sé el nombre
        </label>
      </div>

      {/* Campos específicos para "Encontrada" */}
      {esEncontrada && (
        <>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Lugar donde fue encontrado</label>
            <input
              type="text"
              name="lugarEncontrado"
              value={formData.lugarEncontrado}
              onChange={handleChange}
              placeholder="Ej: Calle Los Alamos 123"
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Fecha en que fue encontrado</label>
            <input
              type="date"
              name="fechaEncontrado"
              value={formData.fechaEncontrado}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Estado de salud</label>
            <select
              name="estadoSalud"
              value={formData.estadoSalud}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
            >
              <option value="Bueno">Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
              <option value="Herido">Herido</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
              <input
                type="checkbox"
                name="tieneCollar"
                checked={formData.tieneCollar}
                onChange={handleChange}
              /> Tiene collar
            </label>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
              <input
                type="checkbox"
                name="tieneIdentificacion"
                checked={formData.tieneIdentificacion}
                onChange={handleChange}
              /> Tiene identificación
            </label>
          </div>
        </>
      )}

      {/* Coordenadas */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Latitud *</label>
        <input
          type="number"
          step="any"
          name="latitud"
          value={formData.latitud}
          onChange={handleChange}
          placeholder="Ej: -33.437"
          required
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Longitud *</label>
        <input
          type="number"
          step="any"
          name="longitud"
          value={formData.longitud}
          onChange={handleChange}
          placeholder="Ej: -70.651"
          required
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        />
        <small style={{ color: "#6c757d" }}>Valores negativos para Chile</small>
      </div>

      {/* Dirección de referencia */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Dirección de referencia</label>
        <input
          type="text"
          name="direccionReferencia"
          value={formData.direccionReferencia}
          onChange={handleChange}
          placeholder="Ej: Cerro Alegre, Valparaíso"
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        />
      </div>

      {/* Contacto */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Nombre de contacto</label>
        <input
          type="text"
          name="nombreContacto"
          value={formData.nombreContacto}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Teléfono de contacto</label>
        <input
          type="text"
          name="telefonoContacto"
          value={formData.telefonoContacto}
          onChange={handleChange}
          placeholder="Ej: 912345678"
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        />
      </div>

      {/* Descripción */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ej: Tiene una mancha en la oreja..."
          rows="3"
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ced4da" }}
        />
      </div>

      {/* BOTONES CON COLOR DINÁMICO */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
        <button
          type="submit"
          disabled={cargando}
          style={{
            flex: 1,
            padding: "14px",
            backgroundColor: esEncontrada ? "#28a745" : "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {cargando ? "Creando..." : esEncontrada ? "Publicar encontrada" : "Publicar perdida"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          style={{
            padding: "14px 24px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioReporte;