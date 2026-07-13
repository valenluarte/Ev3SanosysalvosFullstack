package com.sanossalvos.matching.dto;

public class ReporteDTO {

    private Long id;
    private String tipoMascota;
    private String raza;
    private String color;
    private String sexo;
    private String edad;  // ← CAMBIADO: Integer → String
    private String nombreMascota;
    private String descripcion;
    private String estado;
    private Double latitud;
    private Double longitud;
    private String direccionReferencia;
    private String nombreContacto;
    private String telefonoContacto;
    private String emailContacto;
    private String urlFoto;
    private String estadoSalud;
    private Boolean tieneCollar;
    private Boolean tieneIdentificacion;

    // Constructores
    public ReporteDTO() {}

    public ReporteDTO(Long id, String tipoMascota, String raza, String color, String sexo,
                      String edad, String nombreMascota, String descripcion, String estado,
                      Double latitud, Double longitud, String direccionReferencia,
                      String nombreContacto, String telefonoContacto, String emailContacto,
                      String urlFoto, String estadoSalud, Boolean tieneCollar, Boolean tieneIdentificacion) {
        this.id = id;
        this.tipoMascota = tipoMascota;
        this.raza = raza;
        this.color = color;
        this.sexo = sexo;
        this.edad = edad;
        this.nombreMascota = nombreMascota;
        this.descripcion = descripcion;
        this.estado = estado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.direccionReferencia = direccionReferencia;
        this.nombreContacto = nombreContacto;
        this.telefonoContacto = telefonoContacto;
        this.emailContacto = emailContacto;
        this.urlFoto = urlFoto;
        this.estadoSalud = estadoSalud;
        this.tieneCollar = tieneCollar;
        this.tieneIdentificacion = tieneIdentificacion;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipoMascota() { return tipoMascota; }
    public void setTipoMascota(String tipoMascota) { this.tipoMascota = tipoMascota; }

    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getSexo() { return sexo; }
    public void setSexo(String sexo) { this.sexo = sexo; }

    public String getEdad() { return edad; }  // ← CAMBIADO
    public void setEdad(String edad) { this.edad = edad; }  // ← CAMBIADO

    public String getNombreMascota() { return nombreMascota; }
    public void setNombreMascota(String nombreMascota) { this.nombreMascota = nombreMascota; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Double getLatitud() { return latitud; }
    public void setLatitud(Double latitud) { this.latitud = latitud; }

    public Double getLongitud() { return longitud; }
    public void setLongitud(Double longitud) { this.longitud = longitud; }

    public String getDireccionReferencia() { return direccionReferencia; }
    public void setDireccionReferencia(String direccionReferencia) { this.direccionReferencia = direccionReferencia; }

    public String getNombreContacto() { return nombreContacto; }
    public void setNombreContacto(String nombreContacto) { this.nombreContacto = nombreContacto; }

    public String getTelefonoContacto() { return telefonoContacto; }
    public void setTelefonoContacto(String telefonoContacto) { this.telefonoContacto = telefonoContacto; }

    public String getEmailContacto() { return emailContacto; }
    public void setEmailContacto(String emailContacto) { this.emailContacto = emailContacto; }

    public String getUrlFoto() { return urlFoto; }
    public void setUrlFoto(String urlFoto) { this.urlFoto = urlFoto; }

    public String getEstadoSalud() { return estadoSalud; }
    public void setEstadoSalud(String estadoSalud) { this.estadoSalud = estadoSalud; }

    public Boolean getTieneCollar() { return tieneCollar; }
    public void setTieneCollar(Boolean tieneCollar) { this.tieneCollar = tieneCollar; }

    public Boolean getTieneIdentificacion() { return tieneIdentificacion; }
    public void setTieneIdentificacion(Boolean tieneIdentificacion) { this.tieneIdentificacion = tieneIdentificacion; }

    @Override
    public String toString() {
        return "ReporteDTO{" +
                "id=" + id +
                ", tipoMascota='" + tipoMascota + '\'' +
                ", raza='" + raza + '\'' +
                ", color='" + color + '\'' +
                ", sexo='" + sexo + '\'' +
                ", edad='" + edad + '\'' +
                ", nombreMascota='" + nombreMascota + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                ", latitud=" + latitud +
                ", longitud=" + longitud +
                ", direccionReferencia='" + direccionReferencia + '\'' +
                ", nombreContacto='" + nombreContacto + '\'' +
                ", telefonoContacto='" + telefonoContacto + '\'' +
                ", emailContacto='" + emailContacto + '\'' +
                ", urlFoto='" + urlFoto + '\'' +
                ", estadoSalud='" + estadoSalud + '\'' +
                ", tieneCollar=" + tieneCollar +
                ", tieneIdentificacion=" + tieneIdentificacion +
                '}';
    }
}