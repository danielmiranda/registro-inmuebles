package com.danielmiranda.backend.persona.service;

import com.danielmiranda.backend.common.exception.DuplicateResourceException;
import com.danielmiranda.backend.common.exception.ResourceNotFoundException;
import com.danielmiranda.backend.persona.dto.PersonaCreateUpdateDTO;
import com.danielmiranda.backend.persona.PersonaResponseDTO;
import com.danielmiranda.backend.persona.mapper.PersonaMapper;
import com.danielmiranda.backend.persona.model.Persona;
import com.danielmiranda.backend.persona.repository.PersonaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonaService {

    private final PersonaRepository repository;
    private final PersonaMapper mapper;

    public List<PersonaResponseDTO> findAll() {
        return repository.findAllByDeletedFalse().stream()
                .map(mapper::toPersonaResponseDTO)
                .toList();
    }

    public PersonaResponseDTO create(PersonaCreateUpdateDTO dto) {
        String cuit = normalize(dto.cuit());
        if (repository.existsByCuitAndDeletedFalse(cuit)) {
            throw new DuplicateResourceException("Ya existe una persona con el CUIT especificado");
        }
        Persona persona = mapper.toPersona(dto);
        persona.setCuit(cuit);
        Persona saved = repository.save(persona);
        return mapper.toPersonaResponseDTO(saved);
    }

    public PersonaResponseDTO update(Long id, PersonaCreateUpdateDTO dto) {
        Persona persona = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));

        String newCuit = normalize(dto.cuit());
        if (!newCuit.equalsIgnoreCase(persona.getCuit()) && repository.existsByCuitAndDeletedFalse(newCuit)) {
            throw new DuplicateResourceException("Ya existe una persona con el CUIT especificado");
        }

        mapper.updatePersonaFromDto(dto, persona);
        persona.setCuit(newCuit);
        Persona updated = repository.save(persona);
        return mapper.toPersonaResponseDTO(updated);
    }

    public void delete(Long id) {
        Persona persona = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
        persona.setDeleted(true);
        repository.save(persona);
    }

    private String normalize(String value) {
        return value == null ? null : value.trim();
    }
}
