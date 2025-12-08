package com.danielmiranda.backend.ubicacion.controller;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.ubicacion.UbicacionResponseDTO;
import com.danielmiranda.backend.ubicacion.mapper.UbicacionMapper;
import com.danielmiranda.backend.ubicacion.model.Ciudad;
import com.danielmiranda.backend.ubicacion.repository.CiudadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ciudades")
@RequiredArgsConstructor
public class CiudadController {
    private final CiudadRepository repository;
    private final UbicacionMapper mapper;

    @GetMapping
    public ResponseEntity<List<UbicacionResponseDTO.CiudadDTO>> findAll() {
        List<Ciudad> ciudades = repository.findAll();

        if (ciudades.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }
        return ResponseEntity
                .ok()
                .body(ciudades.stream()
                        .map(mapper::toCiudadDTO)
                        .collect(Collectors.toList()));
    }
}
