package com.sanossalvos.matching.service;

import com.sanossalvos.matching.dto.MatchRequestDTO;
import com.sanossalvos.matching.dto.MatchResultDTO;
import com.sanossalvos.matching.dto.ReporteDTO;
import com.sanossalvos.matching.engine.MatchingEngine;
import com.sanossalvos.matching.client.ReporteClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchingService {

    private final ReporteClient client;
    private final MatchingEngine engine;

    public MatchingService(ReporteClient client, MatchingEngine engine) {
        this.client = client;
        this.engine = engine;
    }

    public List<MatchResultDTO> findMatches(MatchRequestDTO request) {
        // Obtener reportes del tipo opuesto
        String tipoBuscado = request.getReporteEncontrado().getEstado().equals("PERDIDA") ? "ENCONTRADA" : "PERDIDA";
        List<ReporteDTO> candidatos = client.getReportesByEstado(tipoBuscado);
        
        // Calcular matches
        return engine.calculateMatches(request.getReporteEncontrado(), candidatos);
    }
}