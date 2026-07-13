package com.sanossalvos.petreport.repository;

import com.sanossalvos.petreport.entity.EstadoReporte;
import com.sanossalvos.petreport.entity.ReporteMascota;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class ReporteMascotaRepositoryTest {

    @Autowired
    private ReporteMascotaRepository repository;

    private ReporteMascota reportePerdida;
    private ReporteMascota reporteEncontrada;

    @BeforeEach
    void setUp() {
        reportePerdida = new ReporteMascota();
        reportePerdida.setNombreMascota("Firulais");
        reportePerdida.setTipoMascota("Perro");
        reportePerdida.setRaza("Labrador");
        reportePerdida.setColor("Dorado");
        reportePerdida.setSexo("Macho");
        reportePerdida.setEstado(EstadoReporte.PERDIDA);
        reportePerdida.setLatitud(-33.456);
        reportePerdida.setLongitud(-70.678);
        reportePerdida.setFechaReporte(LocalDateTime.now());
        repository.save(reportePerdida);

        reporteEncontrada = new ReporteMascota();
        reporteEncontrada.setNombreMascota("Sin identificación");
        reporteEncontrada.setTipoMascota("Perro");
        reporteEncontrada.setRaza("Labrador");
        reporteEncontrada.setColor("Dorado");
        reporteEncontrada.setSexo("Macho");
        reporteEncontrada.setEstado(EstadoReporte.ENCONTRADA);
        reporteEncontrada.setLatitud(-33.456);
        reporteEncontrada.setLongitud(-70.678);
        reporteEncontrada.setFechaReporte(LocalDateTime.now());
        repository.save(reporteEncontrada);
    }

    @Test
    void testFindByEstado() {
        List<ReporteMascota> perdidas = repository.findByEstado(EstadoReporte.PERDIDA);
        assertThat(perdidas).hasSize(1);
        assertThat(perdidas.get(0).getNombreMascota()).isEqualTo("Firulais");

        List<ReporteMascota> encontradas = repository.findByEstado(EstadoReporte.ENCONTRADA);
        assertThat(encontradas).hasSize(1);
        assertThat(encontradas.get(0).getNombreMascota()).isEqualTo("Sin identificación");
    }

    @Test
    void testFindByTipoMascota() {
        List<ReporteMascota> reportes = repository.findByTipoMascota("Perro");
        assertThat(reportes).hasSize(2);
    }

    @Test
    void testFindByRazaContainingIgnoreCase() {
        List<ReporteMascota> reportes = repository.findByRazaContainingIgnoreCase("labrador");
        assertThat(reportes).hasSize(2);
    }

    @Test
    void testSaveReporte() {
        ReporteMascota nuevo = new ReporteMascota();
        nuevo.setNombreMascota("Copito");
        nuevo.setTipoMascota("Perro");
        nuevo.setRaza("Beagle");
        nuevo.setColor("Blanco");
        nuevo.setSexo("Macho");
        nuevo.setEstado(EstadoReporte.PERDIDA);
        nuevo.setLatitud(-33.456);
        nuevo.setLongitud(-70.678);

        ReporteMascota guardado = repository.save(nuevo);
        assertThat(guardado.getId()).isNotNull();
        assertThat(guardado.getNombreMascota()).isEqualTo("Copito");
    }

    @Test
    void testDeleteReporte() {
        repository.delete(reportePerdida);
        List<ReporteMascota> reportes = repository.findAll();
        assertThat(reportes).hasSize(1);
    }

    @Test
    void testFindById() {
        Optional<ReporteMascota> encontrado = repository.findById(reportePerdida.getId());
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNombreMascota()).isEqualTo("Firulais");
    }
}