package com.sanossalvos.petreport.serviceImpl;

import com.sanossalvos.petreport.dto.ReporteRequest;
import com.sanossalvos.petreport.dto.ReporteResponse;
import com.sanossalvos.petreport.entity.EstadoReporte;
import com.sanossalvos.petreport.entity.ReporteMascota;
import com.sanossalvos.petreport.exception.ResourceNotFoundException;
import com.sanossalvos.petreport.mapper.ReporteMapper;
import com.sanossalvos.petreport.repository.ReporteMascotaRepository;
import com.sanossalvos.petreport.service.ReporteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteServiceImpl implements ReporteService {

    private final ReporteMascotaRepository repository;
    private final ReporteMapper mapper;

    public ReporteServiceImpl(ReporteMascotaRepository repository, ReporteMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<ReporteResponse> obtenerTodos() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public ReporteResponse obtenerPorId(Long id) {

        ReporteMascota reporte = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Reporte no encontrado con id: " + id));

        return mapper.toResponse(reporte);
    }

    @Override
    public ReporteResponse crearReporte(ReporteRequest request) {

        ReporteMascota reporte = mapper.toEntity(request);

        return mapper.toResponse(repository.save(reporte));
    }

    @Override
    public ReporteResponse actualizarReporte(Long id, ReporteRequest request) {

        ReporteMascota reporte = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Reporte no encontrado con id: " + id));

        mapper.updateEntity(request, reporte);

        return mapper.toResponse(repository.save(reporte));
    }

    @Override
    public void eliminarReporte(Long id) {

        ReporteMascota reporte = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Reporte no encontrado con id: " + id));

        repository.delete(reporte);
    }

    @Override
    public List<ReporteResponse> obtenerPerdidas() {

        return repository.findByEstado(EstadoReporte.PERDIDA)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public List<ReporteResponse> obtenerEncontradas() {

        return repository.findByEstado(EstadoReporte.ENCONTRADA)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public List<ReporteResponse> buscarPorTipo(String tipo) {

        return repository.findByTipoMascota(tipo)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public List<ReporteResponse> buscarPorRaza(String raza) {

        return repository.findByRazaContainingIgnoreCase(raza)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}