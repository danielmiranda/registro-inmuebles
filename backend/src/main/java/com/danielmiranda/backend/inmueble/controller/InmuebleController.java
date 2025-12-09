package com.danielmiranda.backend.inmueble.controller;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.inmueble.InmuebleDTO;
import com.danielmiranda.backend.inmueble.InmuebleResponseDTO;
import com.danielmiranda.backend.inmueble.service.InmuebleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/inmuebles")
@RequiredArgsConstructor
public class InmuebleController {

    private final InmuebleService service;

    @GetMapping
    public ResponseEntity<List<InmuebleResponseDTO>> findAll() {
        List<InmuebleResponseDTO> dtos = service.findAll();

        if (dtos.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }
        return ResponseEntity
                .ok()
                .body(dtos);

    }

    @PostMapping
    public ResponseEntity<InmuebleResponseDTO> create(@Valid @RequestBody InmuebleDTO inmuebleDTO) {
        InmuebleResponseDTO created = service.create(inmuebleDTO);
        return ResponseEntity
                .status(201)
                .body(created);
    }
}
