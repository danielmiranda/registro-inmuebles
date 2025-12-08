package com.danielmiranda.backend.ubicacion.repository;

import com.danielmiranda.backend.ubicacion.model.Provincia;
import com.danielmiranda.backend.ubicacion.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    List<Region> findByProvincia(Provincia provincia);
}
