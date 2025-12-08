package com.danielmiranda.backend.ubicacion.repository;

import com.danielmiranda.backend.ubicacion.model.Provincia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {
}
