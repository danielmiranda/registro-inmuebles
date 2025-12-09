package com.danielmiranda.backend.persona.adapter;

import com.danielmiranda.backend.persona.api.PersonaAccess;
import com.danielmiranda.backend.persona.repository.PersonaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonaAccessAdapter implements PersonaAccess {

    private final PersonaRepository personaRepository;

    @Override
    public boolean existsActiveById(Long personaId) {
        return personaRepository.findByIdAndDeletedFalse(personaId).isPresent();
    }
}
