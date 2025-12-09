package com.danielmiranda.backend.afectacion.service;

import com.danielmiranda.backend.afectacion.dto.AfectacionCreateUpdateDTO;
import com.danielmiranda.backend.afectacion.dto.AfectacionResponseDTO;
import com.danielmiranda.backend.afectacion.mapper.AfectacionMapper;
import com.danielmiranda.backend.afectacion.model.AfectacionVivienda;
import com.danielmiranda.backend.afectacion.model.EstadoAfectacion;
import com.danielmiranda.backend.afectacion.repository.AfectacionRepository;
import com.danielmiranda.backend.common.exception.BusinessRuleException;
import com.danielmiranda.backend.common.exception.DuplicateResourceException;
import com.danielmiranda.backend.common.exception.ResourceNotFoundException;
import com.danielmiranda.backend.persona.api.InmuebleAccess;
import com.danielmiranda.backend.persona.api.PersonaAccess;
import com.danielmiranda.backend.persona.api.TitularidadAccess;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AfectacionService {

    private final AfectacionRepository repository;
    private final AfectacionMapper mapper;
    private final PersonaAccess personaAccess;
    private final InmuebleAccess inmuebleAccess;
    private final TitularidadAccess titularidadAccess;

    public List<AfectacionResponseDTO> findAll() {
        return repository.findAllByDeletedFalse().stream()
                .map(mapper::toResponseDTO)
                .toList();
    }

    public List<AfectacionResponseDTO> findByPersona(Long personaId) {
        return repository.findAllByPersonaIdAndDeletedFalse(personaId).stream()
                .map(mapper::toResponseDTO)
                .toList();
    }

    public List<AfectacionResponseDTO> findByInmueble(Long inmuebleId) {
        return repository.findAllByInmuebleIdAndDeletedFalse(inmuebleId).stream()
                .map(mapper::toResponseDTO)
                .toList();
    }

    public AfectacionResponseDTO create(AfectacionCreateUpdateDTO dto) {
        validateDto(dto);
        validatePersonaAndInmueble(dto.personaId(), dto.inmuebleId());
        validateTitularidad(dto.personaId(), dto.inmuebleId());

        // Evitar duplicado por misma persona + inmueble
        if (repository.existsByPersonaIdAndInmuebleIdAndDeletedFalse(dto.personaId(), dto.inmuebleId())) {
            throw new DuplicateResourceException("Ya existe una afectación para esa persona y ese inmueble");
        }

        // Regla: Solo una afectación APROBADA por persona
        if (EstadoAfectacion.APROBADA.equals(dto.estado()) &&
                repository.existsByPersonaIdAndEstadoAndDeletedFalse(dto.personaId(), EstadoAfectacion.APROBADA)) {
            throw new BusinessRuleException("La persona ya tiene un bien de familia registrado (APROBADA)");
        }

        AfectacionVivienda entity = new AfectacionVivienda();
        mapper.updateEntityFromDto(dto, entity);

        AfectacionVivienda saved = repository.save(entity);
        return mapper.toResponseDTO(saved);
    }

    public AfectacionResponseDTO update(Long id, AfectacionCreateUpdateDTO dto) {
        validateDto(dto);

        AfectacionVivienda entity = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Afectación no encontrada"));

        // Si cambian IDs, validar
        Long personaId = dto.personaId();
        Long inmuebleId = dto.inmuebleId();

        if (!Objects.equals(personaId, entity.getPersonaId()) || !Objects.equals(inmuebleId, entity.getInmuebleId())) {
            validatePersonaAndInmueble(personaId, inmuebleId);
            validateTitularidad(personaId, inmuebleId);
        }

        // Evitar duplicado con otra afectación persona+inmueble
        if (repository.existsByPersonaIdAndInmuebleIdAndIdNotAndDeletedFalse(personaId, inmuebleId, id)) {
            throw new DuplicateResourceException("Ya existe una afectación para esa persona y ese inmueble");
        }

        // Regla: Solo una afectación APROBADA por persona (excluyendo esta)
        if (EstadoAfectacion.APROBADA.equals(dto.estado()) &&
                repository.existsByPersonaIdAndEstadoAndIdNotAndDeletedFalse(personaId, EstadoAfectacion.APROBADA, id)) {
            throw new BusinessRuleException("La persona ya tiene un bien de familia registrado (APROBADA)");
        }

        mapper.updateEntityFromDto(dto, entity);
        AfectacionVivienda updated = repository.save(entity);
        return mapper.toResponseDTO(updated);
    }

    public void delete(Long id) {
        AfectacionVivienda entity = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Afectación no encontrada"));
        entity.setDeleted(true);
        repository.save(entity);
    }

    private void validateDto(AfectacionCreateUpdateDTO dto) {
        if (dto.personaId() == null) {
            throw new BusinessRuleException("personaId es requerido");
        }
        if (dto.inmuebleId() == null) {
            throw new BusinessRuleException("inmuebleId es requerido");
        }
        if (dto.estado() == null) {
            throw new BusinessRuleException("estado es requerido");
        }
    }

    private void validatePersonaAndInmueble(Long personaId, Long inmuebleId) {
        if (!personaAccess.existsActiveById(personaId)) {
            throw new ResourceNotFoundException("Persona no encontrada");
        }
        inmuebleAccess.findById(inmuebleId)
                .orElseThrow(() -> new ResourceNotFoundException("Inmueble no encontrado"));
    }

    private void validateTitularidad(Long personaId, Long inmuebleId) {
        if (!titularidadAccess.hasTitularidad(personaId, inmuebleId)) {
            throw new BusinessRuleException("Para afectar un bien de familia, la persona debe ser titular del inmueble");
        }
    }
}
