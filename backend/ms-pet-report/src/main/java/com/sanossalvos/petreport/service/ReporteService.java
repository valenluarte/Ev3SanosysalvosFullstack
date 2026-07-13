package com.sanossalvos.petreport.service;

import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;

import java.util.List;

public interface ReporteService {

    List<ReporteResponse> obtenerTodos();

    ReporteResponse obtenerPorId(Long id);

    ReporteResponse crearReporte(ReporteRequest request);

    ReporteResponse actualizarReporte(Long id, ReporteRequest request);

    void eliminarReporte(Long id);

    List<ReporteResponse> obtenerPerdidas();

    List<ReporteResponse> obtenerEncontradas();

    List<ReporteResponse> buscarPorTipo(String tipo);

    List<ReporteResponse> buscarPorRaza(String raza);

}