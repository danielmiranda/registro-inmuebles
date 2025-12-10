package com.danielmiranda.backend.persona.service;

import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.common.exception.DuplicateResourceException;
import com.danielmiranda.backend.common.exception.ResourceNotFoundException;
import com.danielmiranda.backend.persona.api.InmuebleAccess;
import com.danielmiranda.backend.persona.api.AfectacionAccess;
import com.danielmiranda.backend.persona.mapper.TitularidadMapper;
import com.danielmiranda.backend.persona.model.Persona;
import com.danielmiranda.backend.persona.model.Titularidad;
import com.danielmiranda.backend.persona.repository.PersonaRepository;
import com.danielmiranda.backend.persona.repository.TitularidadRepository;
import com.danielmiranda.backend.persona.dto.TitularidadCreateUpdateDTO;
import com.danielmiranda.backend.persona.TitularidadResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TitularidadService {

    private final TitularidadRepository titularidadRepository;
    private final PersonaRepository personaRepository;
    private final InmuebleAccess inmuebleAccess;
    private final AfectacionAccess afectacionAccess;
    private final TitularidadMapper mapper;

    public List<TitularidadResponseDTO> findAll() {
        return titularidadRepository.findAllByDeletedFalse().stream()
                .map(t -> mapper.toResponseDTO(t, afectacionAccess.hasAprobadaByInmuebleId(t.getInmuebleId())))
                .toList();
    }

    public List<TitularidadResponseDTO> findByPersona(Long personaId) {
        return titularidadRepository.findAllByPersona_IdAndDeletedFalse(personaId).stream()
                .map(t -> mapper.toResponseDTO(t, afectacionAccess.hasAprobadaByInmuebleId(t.getInmuebleId())))
                .toList();
    }

    public List<TitularidadResponseDTO> findByInmueble(Long inmuebleId) {
        return titularidadRepository.findAllByInmuebleIdAndDeletedFalse(inmuebleId).stream()
                .map(t -> mapper.toResponseDTO(t, afectacionAccess.hasAprobadaByInmuebleId(t.getInmuebleId())))
                .toList();
    }

    public TitularidadResponseDTO create(TitularidadCreateUpdateDTO dto) {
        validateDto(dto);

        Persona persona = personaRepository.findByIdAndDeletedFalse(dto.personaId())
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));

        // validar inmueble vía puerto
        inmuebleAccess.findById(dto.inmuebleId())
                .orElseThrow(() -> new ResourceNotFoundException("Inmueble no encontrado"));

        if (titularidadRepository.existsByPersona_IdAndInmuebleIdAndDeletedFalse(dto.personaId(), dto.inmuebleId())) {
            throw new DuplicateResourceException("Ya existe una titularidad para esa persona en ese inmueble");
        }

        Titularidad entity = new Titularidad();
        entity.setPersona(persona);
        entity.setInmuebleId(dto.inmuebleId());
        entity.setNumerador(dto.numerador());
        entity.setDenominador(dto.denominador());

        Titularidad saved = titularidadRepository.save(entity);
        return mapper.toResponseDTO(saved, afectacionAccess.hasAprobadaByInmuebleId(saved.getInmuebleId()));
    }

    public TitularidadResponseDTO update(Long id, TitularidadCreateUpdateDTO dto) {
        validateDto(dto);

        Titularidad entity = titularidadRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Titularidad no encontrada"));

        // Si cambia persona, hay que cargarla; si no, mantener
        if (dto.personaId() != null && (entity.getPersona() == null || !dto.personaId().equals(entity.getPersona().getId()))) {
            Persona persona = personaRepository.findByIdAndDeletedFalse(dto.personaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
            entity.setPersona(persona);
        }

        // validar inmueble
        inmuebleAccess.findById(dto.inmuebleId())
                .orElseThrow(() -> new ResourceNotFoundException("Inmueble no encontrado"));

        // evitar duplicado con otra titularidad
        boolean duplicate = titularidadRepository.existsByPersona_IdAndInmuebleIdAndDeletedFalse(
                entity.getPersona().getId(), dto.inmuebleId());
        if (duplicate && !dto.inmuebleId().equals(entity.getInmuebleId())) {
            throw new DuplicateResourceException("Ya existe una titularidad para esa persona en ese inmueble");
        }

        mapper.updateEntityFromDto(dto, entity);

        Titularidad updated = titularidadRepository.save(entity);
        return mapper.toResponseDTO(updated, afectacionAccess.hasAprobadaByInmuebleId(updated.getInmuebleId()));
    }

    public void delete(Long id) {
        Titularidad entity = titularidadRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Titularidad no encontrada"));
        entity.setDeleted(true);
        titularidadRepository.save(entity);
    }

    private void validateDto(TitularidadCreateUpdateDTO dto) {
        if (dto.personaId() == null) {
            throw new BusinessRuleException("personaId es requerido");
        }
        if (dto.inmuebleId() == null) {
            throw new BusinessRuleException("inmuebleId es requerido");
        }
        if (dto.numerador() == null || dto.numerador() <= 0) {
            throw new BusinessRuleException("numerador debe ser mayor a 0");
        }
        if (dto.denominador() == null || dto.denominador() <= 0) {
            throw new BusinessRuleException("denominador debe ser mayor a 0");
        }
    }
}
