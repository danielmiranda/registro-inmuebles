package com.danielmiranda.backend.inmueble.adapter;

import com.danielmiranda.backend.inmueble.repository.InmuebleRepository;
import com.danielmiranda.backend.persona.api.InmuebleAccess;
import com.danielmiranda.backend.persona.api.InmuebleSummaryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class InmuebleAccessAdapter implements InmuebleAccess {

    private final InmuebleRepository repository;

    @Override
    public Optional<InmuebleSummaryDTO> findById(Long inmuebleId) {
        return repository.findById(inmuebleId)
                .map(i -> new InmuebleSummaryDTO(i.getId(), i.getMatricula(), i.getNomenclatura()));
    }
}
