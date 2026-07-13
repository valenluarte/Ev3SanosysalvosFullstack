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
    private final String MATCHING_URL = "http://localhost:8082/api/v1/matching/check";

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
            Object[] reportes = restTemplate.getForObject(PET_REPORT_URL, Object[].class);
            if (reportes == null || reportes.length == 0) {
                return List.of();
            }

            List<Object> todosLosMatches = new java.util.ArrayList<>();
            
            for (Object obj : reportes) {
                java.util.Map<String, Object> reporte = (java.util.Map<String, Object>) obj;
                String estado = (String) reporte.get("estado");
                
                if ("ENCONTRADA".equals(estado)) {
                    java.util.Map<String, Object> request = new java.util.HashMap<>();
                    request.put("reporteEncontrado", reporte);
                    
                    try {
                        Object[] matches = restTemplate.postForObject(MATCHING_URL, request, Object[].class);
                        if (matches != null) {
                            java.util.Collections.addAll(todosLosMatches, matches);
                        }
                    } catch (Exception e) {
                        // Ignorar errores individuales
                    }
                }
            }
            
            return todosLosMatches;
        } catch (Exception e) {
            return List.of();
        }
    }
}