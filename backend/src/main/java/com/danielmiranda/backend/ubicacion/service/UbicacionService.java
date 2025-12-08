package com.danielmiranda.backend.ubicacion.service;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.ubicacion.UbicacionResponseDTO;
import com.danielmiranda.backend.ubicacion.model.Ciudad;
import com.danielmiranda.backend.ubicacion.model.Provincia;
import com.danielmiranda.backend.ubicacion.mapper.UbicacionMapper;
import com.danielmiranda.backend.ubicacion.repository.CiudadRepository;
import com.danielmiranda.backend.ubicacion.repository.ProvinciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UbicacionService {
    // En UbicacionService.java
    private final ProvinciaRepository provinciaRepository;
    private final CiudadRepository ciudadRepository;
    private final UbicacionMapper mapper;

    public List<UbicacionResponseDTO.ProvinciaDTO> findAllProvincia() {
        List<Provincia> provincias = provinciaRepository.findAll();

        if (provincias.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }

        return provincias.stream()
                .map(mapper::toProvinciaDTO)
                .toList();
    }

    public List<UbicacionResponseDTO.CiudadDTO> findAllCiudad() {
        List<Ciudad> ciudades = ciudadRepository.findAll();

        if (ciudades.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }

        return ciudades.stream()
                .map(mapper::toCiudadDTO)
                .toList();
    }
}
