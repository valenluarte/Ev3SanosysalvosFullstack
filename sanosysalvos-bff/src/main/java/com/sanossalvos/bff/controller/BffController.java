package com.sanossalvos.bff.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/mapa")
@CrossOrigin(origins = "*")
public class BffController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String PET_REPORT_URL = "http://localhost:8083/api/v1/reports";

    @GetMapping("/reportes")
    public List<Object> obtenerReportesMapa() {
        try {
            Object[] reportes = restTemplate.getForObject(PET_REPORT_URL, Object[].class);
            return reportes != null ? List.of(reportes) : List.of();
        } catch (Exception e) {
            return List.of();
        }
    }

    @GetMapping("/matches")
    public List<Object> obtenerMatches() {
        try {
            // TODO: Implementar lógica de matching llamando a ms-matching
            // Por ahora devolvemos lista vacía
            return List.of();
        } catch (Exception e) {
            return List.of();
        }
    }
}