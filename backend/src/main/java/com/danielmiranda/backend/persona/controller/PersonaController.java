package com.danielmiranda.backend.persona.controller;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.persona.PersonaCreateUpdateDTO;
import com.danielmiranda.backend.persona.PersonaResponseDTO;
import com.danielmiranda.backend.persona.service.PersonaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personas")
@RequiredArgsConstructor
public class PersonaController {

    private final PersonaService service;

    @GetMapping
    public ResponseEntity<List<PersonaResponseDTO>> findAll() {
        List<PersonaResponseDTO> personas = service.findAll();
        if (personas.isEmpty()) {
            throw new BusinessRuleException("No hay información disponible");
        }
        return ResponseEntity.ok(personas);
    }

    @PostMapping
    public ResponseEntity<PersonaResponseDTO> create(@Valid @RequestBody PersonaCreateUpdateDTO dto) {
        PersonaResponseDTO created = service.create(dto);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonaResponseDTO> update(@PathVariable Long id,
                                                     @Valid @RequestBody PersonaCreateUpdateDTO dto) {
        PersonaResponseDTO updated = service.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
