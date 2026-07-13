package com.sanossalvos.matching.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanossalvos.matching.dto.MatchRequestDTO;
import com.sanossalvos.matching.dto.MatchResultDTO;
import com.sanossalvos.matching.dto.ReporteDTO;
import com.sanossalvos.matching.service.MatchingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MatchingController.class)
@SuppressWarnings("null")
class MatchingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MatchingService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCheckMatching_ConCoincidencia() throws Exception {
        ReporteDTO reporteEncontrado = new ReporteDTO();
        reporteEncontrado.setId(1L);
        reporteEncontrado.setTipoMascota("Perro");
        reporteEncontrado.setRaza("Labrador");
        reporteEncontrado.setColor("Dorado");
        reporteEncontrado.setSexo("Macho");
        reporteEncontrado.setLatitud(-33.456);
        reporteEncontrado.setLongitud(-70.678);
        reporteEncontrado.setEstado("ENCONTRADA");

        MatchRequestDTO request = new MatchRequestDTO();
        request.setReporteEncontrado(reporteEncontrado);

        MatchResultDTO matchResult = new MatchResultDTO(2L, 1L, 85.0, 1.5);
        List<MatchResultDTO> resultados = Arrays.asList(matchResult);

        when(service.findMatches(any(MatchRequestDTO.class))).thenReturn(resultados);

        mockMvc.perform(post("/api/v1/matching/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].scoreTotal").value(85.0))
                .andExpect(jsonPath("$[0].idPerdida").value(2L))
                .andExpect(jsonPath("$[0].idEncontrada").value(1L));
    }

    @Test
    void testCheckMatching_SinCoincidencias() throws Exception {
        ReporteDTO reporteEncontrado = new ReporteDTO();
        reporteEncontrado.setId(1L);
        reporteEncontrado.setTipoMascota("Perro");
        reporteEncontrado.setRaza("Labrador");
        reporteEncontrado.setColor("Dorado");
        reporteEncontrado.setSexo("Macho");
        reporteEncontrado.setLatitud(-33.456);
        reporteEncontrado.setLongitud(-70.678);
        reporteEncontrado.setEstado("ENCONTRADA");

        MatchRequestDTO request = new MatchRequestDTO();
        request.setReporteEncontrado(reporteEncontrado);

        when(service.findMatches(any(MatchRequestDTO.class))).thenReturn(Arrays.asList());

        mockMvc.perform(post("/api/v1/matching/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }
}