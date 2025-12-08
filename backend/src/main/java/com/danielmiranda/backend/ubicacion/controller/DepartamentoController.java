package com.danielmiranda.backend.ubicacion.controller;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.ubicacion.UbicacionResponseDTO;
import com.danielmiranda.backend.ubicacion.mapper.UbicacionMapper;
import com.danielmiranda.backend.ubicacion.model.Departamento;
import com.danielmiranda.backend.ubicacion.repository.DepartamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/departamentos")
@RequiredArgsConstructor
public class DepartamentoController {

    private final DepartamentoRepository repository;
    private final UbicacionMapper mapper;

    @GetMapping
    public ResponseEntity<List<UbicacionResponseDTO.DepartamentoDTO>> findAll() {
        List<Departamento> departamentos = repository.findAll();

        if (departamentos.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }

        return ResponseEntity
                .ok()
                .body(departamentos.stream()
                        .map(mapper::toDepartamentoDTO)
                        .collect(Collectors.toList()));

    }

}
