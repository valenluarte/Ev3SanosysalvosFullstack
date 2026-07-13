package com.sanossalvos.matching.engine;

import com.sanossalvos.matching.dto.MatchResultDTO;
import com.sanossalvos.matching.dto.ReporteDTO;
import com.sanossalvos.matching.util.DistanceCalculator;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MatchingEngine {

    public List<MatchResultDTO> calculateMatches(ReporteDTO encontrado, List<ReporteDTO> candidatos) {
        List<MatchResultDTO> results = new ArrayList<>();

        for (ReporteDTO candidato : candidatos) {
            double score = calculateScore(encontrado, candidato);
            if (score >= 50) {
                results.add(new MatchResultDTO(
                    candidato.getId(),
                    encontrado.getId(),
                    score,
                    DistanceCalculator.distance(
                        encontrado.getLatitud(),
                        encontrado.getLongitud(),
                        candidato.getLatitud(),
                        candidato.getLongitud()
                    )
                ));
            }
        }

        // Ordenar sin advertencias
        results.sort((a, b) -> Double.compare(b.getScoreTotal(), a.getScoreTotal()));
        return results;
    }

    private double calculateScore(ReporteDTO a, ReporteDTO b) {
        double score = 0.0;

        // Tipo de mascota (25%)
        if (a.getTipoMascota() != null && b.getTipoMascota() != null &&
            a.getTipoMascota().equalsIgnoreCase(b.getTipoMascota())) {
            score += 25;
        }

        // Raza (20%)
        if (a.getRaza() != null && b.getRaza() != null) {
            if (a.getRaza().equalsIgnoreCase(b.getRaza())) {
                score += 20;
            }
        } else {
            score += 10;
        }

        // Color (15%)
        if (a.getColor() != null && b.getColor() != null) {
            String[] coloresA = a.getColor().split(",");
            String[] coloresB = b.getColor().split(",");
            boolean match = false;
            for (String ca : coloresA) {
                for (String cb : coloresB) {
                    if (ca.trim().equalsIgnoreCase(cb.trim())) {
                        match = true;
                        break;
                    }
                }
                if (match) break;
            }
            if (match) score += 15;
        }

        // Ubicación (25%)
        if (a.getLatitud() != null && a.getLongitud() != null &&
            b.getLatitud() != null && b.getLongitud() != null) {
            double distance = DistanceCalculator.distance(
                a.getLatitud(), a.getLongitud(),
                b.getLatitud(), b.getLongitud()
            );
            if (distance < 5) {
                score += 25;
            } else if (distance < 10) {
                score += 15;
            } else if (distance < 20) {
                score += 5;
            }
        }

        // Sexo (10%)
        if (a.getSexo() != null && b.getSexo() != null &&
            a.getSexo().equalsIgnoreCase(b.getSexo())) {
            score += 10;
        }

        // Estado de salud (5%)
        if (a.getEstadoSalud() != null && b.getEstadoSalud() != null &&
            a.getEstadoSalud().equalsIgnoreCase(b.getEstadoSalud())) {
            score += 5;
        }

        return score;
    }
}