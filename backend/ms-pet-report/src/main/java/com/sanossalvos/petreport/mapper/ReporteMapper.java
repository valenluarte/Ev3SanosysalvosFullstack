package com.sanossalvos.petreport.mapper;

import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;
import com.sanossalvos.petreport.entity.EstadoReporte;
import com.sanossalvos.petreport.entity.ReporteMascota;
import org.springframework.stereotype.Component;

@Component
public class ReporteMapper {

    public ReporteMascota toEntity(ReporteRequest request) {

        ReporteMascota reporte = new ReporteMascota();

        reporte.setTipoMascota(request.getTipoMascota());
        reporte.setRaza(request.getRaza());
        reporte.setColor(request.getColor());
        reporte.setSexo(request.getSexo());
        reporte.setEdad(request.getEdad());
        reporte.setTamano(request.getTamano());
        reporte.setNombreMascota(request.getNombreMascota());
        reporte.setDescripcion(request.getDescripcion());

        reporte.setEstado(EstadoReporte.valueOf(request.getEstado()));

        reporte.setLatitud(request.getLatitud());
        reporte.setLongitud(request.getLongitud());
        reporte.setDireccionReferencia(request.getDireccionReferencia());
        reporte.setNombreContacto(request.getNombreContacto());
        reporte.setTelefonoContacto(request.getTelefonoContacto());
        reporte.setEmailContacto(request.getEmailContacto());
        reporte.setUrlFoto(request.getUrlFoto());

        return reporte;
    }

    public ReporteResponse toResponse(ReporteMascota reporte) {

        ReporteResponse response = new ReporteResponse();

        response.setId(reporte.getId());
        response.setTipoMascota(reporte.getTipoMascota());
        response.setRaza(reporte.getRaza());
        response.setColor(reporte.getColor());
        response.setSexo(reporte.getSexo());
        response.setEdad(reporte.getEdad());
        response.setTamano(reporte.getTamano());
        response.setNombreMascota(reporte.getNombreMascota());
        response.setDescripcion(reporte.getDescripcion());

        response.setEstado(reporte.getEstado().name());

        response.setLatitud(reporte.getLatitud());
        response.setLongitud(reporte.getLongitud());
        response.setDireccionReferencia(reporte.getDireccionReferencia());
        response.setFechaReporte(reporte.getFechaReporte());
        response.setNombreContacto(reporte.getNombreContacto());
        response.setTelefonoContacto(reporte.getTelefonoContacto());
        response.setEmailContacto(reporte.getEmailContacto());
        response.setUrlFoto(reporte.getUrlFoto());

        return response;
    }

    public void updateEntity(ReporteRequest request, ReporteMascota reporte) {

        reporte.setTipoMascota(request.getTipoMascota());
        reporte.setRaza(request.getRaza());
        reporte.setColor(request.getColor());
        reporte.setSexo(request.getSexo());
        reporte.setEdad(request.getEdad());
        reporte.setTamano(request.getTamano());
        reporte.setNombreMascota(request.getNombreMascota());
        reporte.setDescripcion(request.getDescripcion());

        reporte.setEstado(EstadoReporte.valueOf(request.getEstado()));

        reporte.setLatitud(request.getLatitud());
        reporte.setLongitud(request.getLongitud());
        reporte.setDireccionReferencia(request.getDireccionReferencia());
        reporte.setNombreContacto(request.getNombreContacto());
        reporte.setTelefonoContacto(request.getTelefonoContacto());
        reporte.setEmailContacto(request.getEmailContacto());
        reporte.setUrlFoto(request.getUrlFoto());
    }
}