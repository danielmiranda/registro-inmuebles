package com.danielmiranda.backend.ubicacion.controller;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.ubicacion.UbicacionResponseDTO;
import com.danielmiranda.backend.ubicacion.mapper.UbicacionMapper;
import com.danielmiranda.backend.ubicacion.model.Provincia;
import com.danielmiranda.backend.ubicacion.repository.ProvinciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/provincias")
@RequiredArgsConstructor
public class ProvinciaController {
    private final ProvinciaRepository repository;
    private final UbicacionMapper mapper;

    @GetMapping
    public ResponseEntity<List<UbicacionResponseDTO.ProvinciaDTO>> findAll() {
        List<Provincia> provincias = repository.findAll();

        if (provincias.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }

        return ResponseEntity
                .ok()
                .body(provincias.stream()
                        .map(mapper::toProvinciaDTO)
                        .collect(Collectors.toList()));
    }
}