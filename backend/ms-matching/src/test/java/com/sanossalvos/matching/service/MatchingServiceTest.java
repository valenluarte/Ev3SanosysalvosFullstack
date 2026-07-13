package com.sanossalvos.matching.service;

import com.sanossalvos.matching.dto.MatchRequestDTO;
import com.sanossalvos.matching.dto.MatchResultDTO;
import com.sanossalvos.matching.dto.ReporteDTO;
import com.sanossalvos.matching.engine.MatchingEngine;
import com.sanossalvos.matching.client.ReporteClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MatchingServiceTest {

    @Mock
    private ReporteClient client;

    @Mock
    private MatchingEngine engine;

    @InjectMocks
    private MatchingService service;

    private ReporteDTO reporteEncontrado;
    private ReporteDTO reportePerdido;
    private MatchRequestDTO request;

    @BeforeEach
    void setUp() {
        reporteEncontrado = new ReporteDTO();
        reporteEncontrado.setId(1L);
        reporteEncontrado.setTipoMascota("Perro");
        reporteEncontrado.setRaza("Labrador");
        reporteEncontrado.setColor("Dorado");
        reporteEncontrado.setSexo("Macho");
        reporteEncontrado.setLatitud(-33.456);
        reporteEncontrado.setLongitud(-70.678);
        reporteEncontrado.setEstado("ENCONTRADA");

        reportePerdido = new ReporteDTO();
        reportePerdido.setId(2L);
        reportePerdido.setTipoMascota("Perro");
        reportePerdido.setRaza("Labrador");
        reportePerdido.setColor("Dorado");
        reportePerdido.setSexo("Macho");
        reportePerdido.setLatitud(-33.456);
        reportePerdido.setLongitud(-70.678);
        reportePerdido.setEstado("PERDIDA");

        request = new MatchRequestDTO();
        request.setReporteEncontrado(reporteEncontrado);
    }

    @Test
    void testFindMatches_ConCoincidencia() {
        List<ReporteDTO> perdidas = Arrays.asList(reportePerdido);

        MatchResultDTO matchResult = new MatchResultDTO(2L, 1L, 85.0, 1.5);

        when(client.getReportesByEstado("PERDIDA")).thenReturn(perdidas);
        when(engine.calculateMatches(reporteEncontrado, perdidas)).thenReturn(Arrays.asList(matchResult));

        List<MatchResultDTO> resultados = service.findMatches(request);

        assertThat(resultados).hasSize(1);
        assertThat(resultados.get(0).getScoreTotal()).isEqualTo(85.0);
        assertThat(resultados.get(0).getIdPerdida()).isEqualTo(2L);
        assertThat(resultados.get(0).getIdEncontrada()).isEqualTo(1L);
    }

    @Test
    void testFindMatches_SinCoincidencias() {
        List<ReporteDTO> perdidas = Arrays.asList();

        when(client.getReportesByEstado("PERDIDA")).thenReturn(perdidas);
        when(engine.calculateMatches(reporteEncontrado, perdidas)).thenReturn(Arrays.asList());

        List<MatchResultDTO> resultados = service.findMatches(request);

        assertThat(resultados).isEmpty();
    }

    @Test
    void testFindMatches_ConMultiplesCoincidencias() {
        ReporteDTO perdido2 = new ReporteDTO();
        perdido2.setId(3L);
        perdido2.setTipoMascota("Perro");
        perdido2.setRaza("Beagle");
        perdido2.setColor("Blanco");
        perdido2.setSexo("Macho");
        perdido2.setLatitud(-33.456);
        perdido2.setLongitud(-70.678);
        perdido2.setEstado("PERDIDA");

        List<ReporteDTO> perdidas = Arrays.asList(reportePerdido, perdido2);

        MatchResultDTO match1 = new MatchResultDTO(2L, 1L, 85.0, 1.5);
        MatchResultDTO match2 = new MatchResultDTO(3L, 1L, 60.0, 2.0);

        when(client.getReportesByEstado("PERDIDA")).thenReturn(perdidas);
        when(engine.calculateMatches(reporteEncontrado, perdidas)).thenReturn(Arrays.asList(match1, match2));

        List<MatchResultDTO> resultados = service.findMatches(request);

        assertThat(resultados).hasSize(2);
        assertThat(resultados.get(0).getScoreTotal()).isEqualTo(85.0);
        assertThat(resultados.get(1).getScoreTotal()).isEqualTo(60.0);
    }
}