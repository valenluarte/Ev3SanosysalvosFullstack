package com.sanossalvos.matching.client;

import com.sanossalvos.matching.dto.ReporteDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Component
public class ReporteClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "http://localhost:8083/api/v1/reports";

    public List<ReporteDTO> getPerdidas() {
        String url = BASE_URL + "/perdidas";
        return Arrays.asList(restTemplate.getForObject(url, ReporteDTO[].class));
    }

    public List<ReporteDTO> getEncontradas() {
        String url = BASE_URL + "/encontradas";
        return Arrays.asList(restTemplate.getForObject(url, ReporteDTO[].class));
    }

    // Método genérico para obtener reportes por estado
    public List<ReporteDTO> getReportesByEstado(String estado) {
        if ("PERDIDA".equalsIgnoreCase(estado)) {
            return getPerdidas();
        } else if ("ENCONTRADA".equalsIgnoreCase(estado)) {
            return getEncontradas();
        }
        return Arrays.asList();
    }
}