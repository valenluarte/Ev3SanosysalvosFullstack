package com.sanossalvos.petreport.repository;

import com.sanossalvos.petreport.entity.EstadoReporte;
import com.sanossalvos.petreport.entity.ReporteMascota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReporteMascotaRepository extends JpaRepository<ReporteMascota, Long> {

    List<ReporteMascota> findByEstado(EstadoReporte estado);

    List<ReporteMascota> findByTipoMascota(String tipoMascota);

    List<ReporteMascota> findByRazaContainingIgnoreCase(String raza);
}