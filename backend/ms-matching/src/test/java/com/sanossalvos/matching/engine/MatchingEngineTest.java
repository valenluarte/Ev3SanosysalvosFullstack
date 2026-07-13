package com.sanossalvos.matching.engine;

import com.sanossalvos.matching.dto.MatchResultDTO;
import com.sanossalvos.matching.dto.ReporteDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class MatchingEngineTest {

    private MatchingEngine engine;
    private ReporteDTO encontrado;
    private ReporteDTO perdido1;
    private ReporteDTO perdido2;

    @BeforeEach
    void setUp() {
        engine = new MatchingEngine();

        encontrado = new ReporteDTO();
        encontrado.setId(1L);
        encontrado.setTipoMascota("Perro");
        encontrado.setRaza("Labrador");
        encontrado.setColor("Dorado");
        encontrado.setSexo("Macho");
        encontrado.setLatitud(-33.456);
        encontrado.setLongitud(-70.678);
        encontrado.setEstado("ENCONTRADA");

        perdido1 = new ReporteDTO();
        perdido1.setId(2L);
        perdido1.setTipoMascota("Perro");
        perdido1.setRaza("Labrador");
        perdido1.setColor("Dorado");
        perdido1.setSexo("Macho");
        perdido1.setLatitud(-33.456);
        perdido1.setLongitud(-70.678);
        perdido1.setEstado("PERDIDA");

        perdido2 = new ReporteDTO();
        perdido2.setId(3L);
        perdido2.setTipoMascota("Gato");
        perdido2.setRaza("Siamés");
        perdido2.setColor("Blanco");
        perdido2.setSexo("Hembra");
        perdido2.setLatitud(-33.456);
        perdido2.setLongitud(-70.678);
        perdido2.setEstado("PERDIDA");
    }

    @Test
    void testCalculateMatches_ConCoincidencia() {
        List<ReporteDTO> perdidas = Arrays.asList(perdido1, perdido2);

        List<MatchResultDTO> resultados = engine.calculateMatches(encontrado, perdidas);

        assertThat(resultados).hasSize(1);
        assertThat(resultados.get(0).getIdPerdida()).isEqualTo(2L);
        assertThat(resultados.get(0).getIdEncontrada()).isEqualTo(1L);
    }

    @Test
    void testCalculateMatches_SinCoincidencias() {
        List<ReporteDTO> perdidas = Arrays.asList(perdido2);

        List<MatchResultDTO> resultados = engine.calculateMatches(encontrado, perdidas);

        assertThat(resultados).isEmpty();
    }

    @Test
    void testCalculateMatches_ConMultiplesCoincidencias() {
        ReporteDTO perdido3 = new ReporteDTO();
        perdido3.setId(4L);
        perdido3.setTipoMascota("Perro");
        perdido3.setRaza("Beagle");
        perdido3.setColor("Blanco");
        perdido3.setSexo("Macho");
        perdido3.setLatitud(-33.456);
        perdido3.setLongitud(-70.678);
        perdido3.setEstado("PERDIDA");

        List<ReporteDTO> perdidas = Arrays.asList(perdido1, perdido3);

        List<MatchResultDTO> resultados = engine.calculateMatches(encontrado, perdidas);

        assertThat(resultados).hasSize(2);
        assertThat(resultados.get(0).getScoreTotal()).isGreaterThan(resultados.get(1).getScoreTotal());
    }
}