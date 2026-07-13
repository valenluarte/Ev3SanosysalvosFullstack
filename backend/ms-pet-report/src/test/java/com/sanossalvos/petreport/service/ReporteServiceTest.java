package com.sanossalvos.petreport.service;

import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;
import com.sanossalvos.petreport.entity.EstadoReporte;
import com.sanossalvos.petreport.entity.ReporteMascota;
import com.sanossalvos.petreport.exception.ResourceNotFoundException;
import com.sanossalvos.petreport.mapper.ReporteMapper;
import com.sanossalvos.petreport.repository.ReporteMascotaRepository;
import com.sanossalvos.petreport.serviceImpl.ReporteServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReporteServiceTest {

    @Mock
    private ReporteMascotaRepository repository;

    @Mock
    private ReporteMapper mapper;

    @InjectMocks
    private ReporteServiceImpl service;

    private ReporteMascota reporte;
    private ReporteRequest request;
    private ReporteResponse response;

    @BeforeEach
    void setUp() {
        reporte = new ReporteMascota();
        reporte.setId(1L);
        reporte.setNombreMascota("Firulais");
        reporte.setTipoMascota("Perro");
        reporte.setRaza("Labrador");
        reporte.setColor("Dorado");
        reporte.setSexo("Macho");
        reporte.setEstado(EstadoReporte.PERDIDA);
        reporte.setLatitud(-33.456);
        reporte.setLongitud(-70.678);
        reporte.setFechaReporte(LocalDateTime.now());

        request = new ReporteRequest();
        request.setNombreMascota("Firulais");
        request.setTipoMascota("Perro");
        request.setRaza("Labrador");
        request.setColor("Dorado");
        request.setSexo("Macho");
        request.setEstado("PERDIDA");
        request.setLatitud(-33.456);
        request.setLongitud(-70.678);

        response = new ReporteResponse();
        response.setId(1L);
        response.setNombreMascota("Firulais");
        response.setTipoMascota("Perro");
        response.setEstado("PERDIDA");
        response.setRaza("Labrador");
    }

    @Test
    void testCrearReporte() {
        when(mapper.toEntity(any(ReporteRequest.class))).thenReturn(reporte);
        when(repository.save(any(ReporteMascota.class))).thenReturn(reporte);
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(response);

        ReporteResponse result = service.crearReporte(request);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getNombreMascota()).isEqualTo("Firulais");

        verify(repository, times(1)).save(any(ReporteMascota.class));
    }

    @Test
    void testObtenerPorId_Exitoso() {
        when(repository.findById(1L)).thenReturn(Optional.of(reporte));
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(response);

        ReporteResponse result = service.obtenerPorId(1L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getNombreMascota()).isEqualTo("Firulais");
    }

    @Test
    void testObtenerPorId_NoEncontrado() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.obtenerPorId(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Reporte no encontrado con id: 999");
    }

    @Test
    void testActualizarReporte() {
        ReporteRequest updateRequest = new ReporteRequest();
        updateRequest.setNombreMascota("Firulais Actualizado");
        updateRequest.setTipoMascota("Perro");
        updateRequest.setRaza("Labrador");
        updateRequest.setColor("Dorado Oscuro");
        updateRequest.setSexo("Macho");
        updateRequest.setEstado("PERDIDA");
        updateRequest.setLatitud(-33.456);
        updateRequest.setLongitud(-70.678);

        ReporteMascota reporteActualizado = new ReporteMascota();
        reporteActualizado.setId(1L);
        reporteActualizado.setNombreMascota("Firulais Actualizado");
        reporteActualizado.setTipoMascota("Perro");
        reporteActualizado.setRaza("Labrador");
        reporteActualizado.setColor("Dorado Oscuro");
        reporteActualizado.setSexo("Macho");
        reporteActualizado.setEstado(EstadoReporte.PERDIDA);
        reporteActualizado.setLatitud(-33.456);
        reporteActualizado.setLongitud(-70.678);

        ReporteResponse responseActualizado = new ReporteResponse();
        responseActualizado.setId(1L);
        responseActualizado.setNombreMascota("Firulais Actualizado");
        responseActualizado.setTipoMascota("Perro");
        responseActualizado.setEstado("PERDIDA");
        responseActualizado.setRaza("Labrador");

        when(repository.findById(1L)).thenReturn(Optional.of(reporte));
        when(repository.save(any(ReporteMascota.class))).thenReturn(reporteActualizado);
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(responseActualizado);

        ReporteResponse result = service.actualizarReporte(1L, updateRequest);

        assertThat(result).isNotNull();
        assertThat(result.getNombreMascota()).isEqualTo("Firulais Actualizado");
    }

    @Test
    void testEliminarReporte() {
        when(repository.findById(1L)).thenReturn(Optional.of(reporte));

        service.eliminarReporte(1L);

        verify(repository, times(1)).delete(reporte);
    }

    @Test
    void testObtenerPerdidas() {
        when(repository.findByEstado(EstadoReporte.PERDIDA)).thenReturn(List.of(reporte));
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(response);

        List<ReporteResponse> resultados = service.obtenerPerdidas();

        assertThat(resultados).hasSize(1);
        assertThat(resultados.get(0).getNombreMascota()).isEqualTo("Firulais");
    }

    @Test
    void testObtenerEncontradas() {
        when(repository.findByEstado(EstadoReporte.ENCONTRADA)).thenReturn(List.of(reporte));
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(response);

        List<ReporteResponse> resultados = service.obtenerEncontradas();

        assertThat(resultados).hasSize(1);
        assertThat(resultados.get(0).getNombreMascota()).isEqualTo("Firulais");
    }

    @Test
    void testBuscarPorTipo() {
        when(repository.findByTipoMascota("Perro")).thenReturn(List.of(reporte));
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(response);

        List<ReporteResponse> resultados = service.buscarPorTipo("Perro");

        assertThat(resultados).hasSize(1);
        assertThat(resultados.get(0).getTipoMascota()).isEqualTo("Perro");
    }

    @Test
    void testBuscarPorRaza() {
        when(repository.findByRazaContainingIgnoreCase("labrador")).thenReturn(List.of(reporte));
        when(mapper.toResponse(any(ReporteMascota.class))).thenReturn(response);

        List<ReporteResponse> resultados = service.buscarPorRaza("labrador");

        assertThat(resultados).hasSize(1);
        assertThat(resultados.get(0).getRaza()).isEqualTo("Labrador");
    }
}