package com.danielmiranda.backend.ubicacion.repository;

import com.danielmiranda.backend.ubicacion.model.Departamento;
import com.danielmiranda.backend.ubicacion.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
    List<Departamento> findByRegion(Region region);
}
