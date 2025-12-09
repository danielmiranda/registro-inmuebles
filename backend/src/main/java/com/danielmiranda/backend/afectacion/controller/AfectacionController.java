package com.danielmiranda.backend.afectacion.controller;

import com.danielmiranda.backend.afectacion.dto.AfectacionCreateUpdateDTO;
import com.danielmiranda.backend.afectacion.dto.AfectacionResponseDTO;
import com.danielmiranda.backend.afectacion.model.EstadoAfectacion;
import com.danielmiranda.backend.afectacion.service.AfectacionService;
import com.danielmiranda.backend.common.exception.BusinessRuleException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/afectaciones")
@RequiredArgsConstructor
public class AfectacionController {

    private final AfectacionService service;

    @GetMapping
    public ResponseEntity<List<AfectacionResponseDTO>> find(
            @RequestParam(required = false) Long personaId,
            @RequestParam(required = false) Long inmuebleId
    ) {
        List<AfectacionResponseDTO> result;
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
    public ResponseEntity<AfectacionResponseDTO> create(@RequestBody AfectacionCreateUpdateDTO dto) {
        AfectacionResponseDTO created = service.create(dto);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AfectacionResponseDTO> update(@PathVariable Long id,
                                                        @RequestBody AfectacionCreateUpdateDTO dto) {
        AfectacionResponseDTO updated = service.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
