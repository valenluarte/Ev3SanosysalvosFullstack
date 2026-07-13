package com.sanossalvos.matching.dto;

public class MatchResultDTO {

    private Long idPerdida;
    private Long idEncontrada;
    private double scoreTotal;
    private double distanciaKm;

    public MatchResultDTO(Long idPerdida, Long idEncontrada, double scoreTotal, double distanciaKm) {
        this.idPerdida = idPerdida;
        this.idEncontrada = idEncontrada;
        this.scoreTotal = scoreTotal;
        this.distanciaKm = distanciaKm;
    }

    public Long getIdPerdida() { return idPerdida; }
    public Long getIdEncontrada() { return idEncontrada; }
    public double getScoreTotal() { return scoreTotal; }
    public double getDistanciaKm() { return distanciaKm; }
}
