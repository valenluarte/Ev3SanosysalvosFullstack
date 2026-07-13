package com.sanossalvos.petreport.mapper;

import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;
import com.sanossalvos.petreport.entity.EstadoReporte;
import com.sanossalvos.petreport.entity.ReporteMascota;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ReporteMapperTest {

    private final ReporteMapper mapper = new ReporteMapper();

    @Test
    void testToEntity() {
        ReporteRequest request = new ReporteRequest();
        request.setNombreMascota("Firulais");
        request.setTipoMascota("Perro");
        request.setRaza("Labrador");
        request.setColor("Dorado");
        request.setSexo("Macho");
        request.setEstado("PERDIDA");
        request.setLatitud(-33.456);
        request.setLongitud(-70.678);

        ReporteMascota entity = mapper.toEntity(request);

        assertThat(entity).isNotNull();
        assertThat(entity.getNombreMascota()).isEqualTo("Firulais");
        assertThat(entity.getTipoMascota()).isEqualTo("Perro");
        assertThat(entity.getRaza()).isEqualTo("Labrador");
        assertThat(entity.getColor()).isEqualTo("Dorado");
        assertThat(entity.getSexo()).isEqualTo("Macho");
        assertThat(entity.getEstado()).isEqualTo(EstadoReporte.PERDIDA);
        assertThat(entity.getLatitud()).isEqualTo(-33.456);
        assertThat(entity.getLongitud()).isEqualTo(-70.678);
    }

    @Test
    void testToResponse() {
        ReporteMascota entity = new ReporteMascota();
        entity.setId(1L);
        entity.setNombreMascota("Firulais");
        entity.setTipoMascota("Perro");
        entity.setRaza("Labrador");
        entity.setColor("Dorado");
        entity.setSexo("Macho");
        entity.setEstado(EstadoReporte.PERDIDA);
        entity.setLatitud(-33.456);
        entity.setLongitud(-70.678);

        ReporteResponse response = mapper.toResponse(entity);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getNombreMascota()).isEqualTo("Firulais");
        assertThat(response.getTipoMascota()).isEqualTo("Perro");
        assertThat(response.getRaza()).isEqualTo("Labrador");
        assertThat(response.getColor()).isEqualTo("Dorado");
        assertThat(response.getSexo()).isEqualTo("Macho");
        assertThat(response.getEstado()).isEqualTo("PERDIDA");
        assertThat(response.getLatitud()).isEqualTo(-33.456);
        assertThat(response.getLongitud()).isEqualTo(-70.678);
    }

    @Test
    void testUpdateEntity() {
        ReporteRequest request = new ReporteRequest();
        request.setNombreMascota("Firulais Actualizado");
        request.setTipoMascota("Perro");
        request.setRaza("Labrador");
        request.setColor("Dorado Oscuro");
        request.setSexo("Macho");
        request.setEstado("PERDIDA");
        request.setLatitud(-33.456);
        request.setLongitud(-70.678);

        ReporteMascota entity = new ReporteMascota();
        entity.setNombreMascota("Firulais");
        entity.setColor("Dorado");

        mapper.updateEntity(request, entity);

        assertThat(entity.getNombreMascota()).isEqualTo("Firulais Actualizado");
        assertThat(entity.getColor()).isEqualTo("Dorado Oscuro");
        assertThat(entity.getTipoMascota()).isEqualTo("Perro");
        assertThat(entity.getRaza()).isEqualTo("Labrador");
        assertThat(entity.getSexo()).isEqualTo("Macho");
        assertThat(entity.getEstado()).isEqualTo(EstadoReporte.PERDIDA);
    }
}