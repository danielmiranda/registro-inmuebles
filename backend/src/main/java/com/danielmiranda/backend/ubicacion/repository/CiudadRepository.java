package com.danielmiranda.backend.ubicacion.repository;

import com.danielmiranda.backend.ubicacion.model.Ciudad;
import com.danielmiranda.backend.ubicacion.model.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Long> {
    List<Ciudad> findByDepartamento(Departamento departamento);
}
