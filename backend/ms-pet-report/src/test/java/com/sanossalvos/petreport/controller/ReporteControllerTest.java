package com.sanossalvos.petreport.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;
import com.sanossalvos.petreport.exception.ResourceNotFoundException;
import com.sanossalvos.petreport.service.ReporteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReporteController.class)
class ReporteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReporteService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllReports() throws Exception {
        ReporteResponse r1 = new ReporteResponse();
        r1.setId(1L);
        r1.setNombreMascota("Firulais");
        r1.setTipoMascota("Perro");
        r1.setEstado("PERDIDA");

        ReporteResponse r2 = new ReporteResponse();
        r2.setId(2L);
        r2.setNombreMascota("Copito");
        r2.setTipoMascota("Perro");
        r2.setEstado("PERDIDA");

        List<ReporteResponse> reportes = Arrays.asList(r1, r2);

        when(service.obtenerTodos()).thenReturn(reportes);

        mockMvc.perform(get("/api/v1/reports"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].nombreMascota").value("Firulais"))
                .andExpect(jsonPath("$[1].nombreMascota").value("Copito"));
    }

    @Test
    void testGetReportById() throws Exception {
        ReporteResponse response = new ReporteResponse();
        response.setId(1L);
        response.setNombreMascota("Firulais");
        response.setTipoMascota("Perro");
        response.setEstado("PERDIDA");

        when(service.obtenerPorId(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/reports/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nombreMascota").value("Firulais"));
    }

    @Test
    void testGetReportById_NotFound() throws Exception {
        when(service.obtenerPorId(999L)).thenThrow(new ResourceNotFoundException("Reporte no encontrado con id: 999"));

        mockMvc.perform(get("/api/v1/reports/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateReport() throws Exception {
        ReporteRequest request = new ReporteRequest();
        request.setNombreMascota("Firulais");
        request.setTipoMascota("Perro");
        request.setRaza("Labrador");
        request.setColor("Dorado");
        request.setSexo("Macho");
        request.setEstado("PERDIDA");
        request.setLatitud(-33.456);
        request.setLongitud(-70.678);

        ReporteResponse response = new ReporteResponse();
        response.setId(1L);
        response.setNombreMascota("Firulais");
        response.setTipoMascota("Perro");
        response.setEstado("PERDIDA");

        when(service.crearReporte(any(ReporteRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/reports")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nombreMascota").value("Firulais"));
    }

    @Test
    void testUpdateReport() throws Exception {
        ReporteRequest request = new ReporteRequest();
        request.setNombreMascota("Firulais Actualizado");
        request.setTipoMascota("Perro");
        request.setRaza("Labrador");
        request.setColor("Dorado Oscuro");
        request.setSexo("Macho");
        request.setEstado("PERDIDA");
        request.setLatitud(-33.456);
        request.setLongitud(-70.678);

        ReporteResponse response = new ReporteResponse();
        response.setId(1L);
        response.setNombreMascota("Firulais Actualizado");
        response.setTipoMascota("Perro");
        response.setEstado("PERDIDA");

        when(service.actualizarReporte(eq(1L), any(ReporteRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/v1/reports/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombreMascota").value("Firulais Actualizado"));
    }

    @Test
    void testDeleteReport() throws Exception {
        doNothing().when(service).eliminarReporte(1L);

        mockMvc.perform(delete("/api/v1/reports/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetPerdidas() throws Exception {
        ReporteResponse r1 = new ReporteResponse();
        r1.setId(1L);
        r1.setNombreMascota("Firulais");
        r1.setEstado("PERDIDA");

        when(service.obtenerPerdidas()).thenReturn(Arrays.asList(r1));

        mockMvc.perform(get("/api/v1/reports/perdidas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nombreMascota").value("Firulais"));
    }

    @Test
    void testGetEncontradas() throws Exception {
        ReporteResponse r1 = new ReporteResponse();
        r1.setId(2L);
        r1.setNombreMascota("Sin identificación");
        r1.setEstado("ENCONTRADA");

        when(service.obtenerEncontradas()).thenReturn(Arrays.asList(r1));

        mockMvc.perform(get("/api/v1/reports/encontradas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nombreMascota").value("Sin identificación"));
    }
}