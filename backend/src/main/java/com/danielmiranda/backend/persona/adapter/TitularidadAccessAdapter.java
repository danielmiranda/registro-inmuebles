package com.danielmiranda.backend.persona.adapter;

import com.danielmiranda.backend.persona.api.TitularidadAccess;
import com.danielmiranda.backend.persona.repository.TitularidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TitularidadAccessAdapter implements TitularidadAccess {

    private final TitularidadRepository titularidadRepository;

    @Override
    public boolean hasTitularidad(Long personaId, Long inmuebleId) {
        return titularidadRepository.existsByPersona_IdAndInmuebleIdAndDeletedFalse(personaId, inmuebleId);
    }
}
