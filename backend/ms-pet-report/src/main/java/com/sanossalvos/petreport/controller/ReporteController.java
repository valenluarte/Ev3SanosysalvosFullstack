package com.sanossalvos.petreport.controller;

import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;
import com.sanossalvos.petreport.service.ReporteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReporteController {

    private final ReporteService service;

    public ReporteController(ReporteService service) {
        this.service = service;
    }

    @GetMapping
    public List<ReporteResponse> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ReporteResponse obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReporteResponse crearReporte(@Valid @RequestBody ReporteRequest request) {
        return service.crearReporte(request);
    }

    @PutMapping("/{id}")
    public ReporteResponse actualizarReporte(
            @PathVariable Long id,
            @Valid @RequestBody ReporteRequest request) {
        return service.actualizarReporte(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarReporte(@PathVariable Long id) {
        service.eliminarReporte(id);
    }

    @GetMapping("/perdidas")
    public List<ReporteResponse> obtenerPerdidas() {
        return service.obtenerPerdidas();
    }

    @GetMapping("/encontradas")
    public List<ReporteResponse> obtenerEncontradas() {
        return service.obtenerEncontradas();
    }

    @GetMapping("/tipo/{tipo}")
    public List<ReporteResponse> buscarPorTipo(@PathVariable String tipo) {
        return service.buscarPorTipo(tipo);
    }

    @GetMapping("/raza/{raza}")
    public List<ReporteResponse> buscarPorRaza(@PathVariable String raza) {
        return service.buscarPorRaza(raza);
    }
}