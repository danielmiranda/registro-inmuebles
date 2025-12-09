package com.danielmiranda.backend.persona.controller;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.persona.service.TitularidadService;
import com.danielmiranda.backend.persona.dto.TitularidadCreateUpdateDTO;
import com.danielmiranda.backend.persona.TitularidadResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/titularidades")
@RequiredArgsConstructor
public class TitularidadController {

    private final TitularidadService service;

    @GetMapping
    public ResponseEntity<List<TitularidadResponseDTO>> find(
            @RequestParam(required = false) Long personaId,
            @RequestParam(required = false) Long inmuebleId
    ) {
        List<TitularidadResponseDTO> result;
        if (personaId != null) {
            result = service.findByPersona(personaId);
        } else if (inmuebleId != null) {
            result = service.findByInmueble(inmuebleId);
        } else {
            result = service.findAll();
        }

        if (result.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<TitularidadResponseDTO> create(@RequestBody TitularidadCreateUpdateDTO dto) {
        TitularidadResponseDTO created = service.create(dto);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TitularidadResponseDTO> update(@PathVariable Long id,
                                                         @RequestBody TitularidadCreateUpdateDTO dto) {
        TitularidadResponseDTO updated = service.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
