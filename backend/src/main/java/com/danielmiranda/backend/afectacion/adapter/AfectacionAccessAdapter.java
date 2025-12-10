package com.danielmiranda.backend.afectacion.adapter;

import com.danielmiranda.backend.afectacion.model.EstadoAfectacion;
import com.danielmiranda.backend.afectacion.repository.AfectacionRepository;
import com.danielmiranda.backend.persona.api.AfectacionAccess;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AfectacionAccessAdapter implements AfectacionAccess {

    private final AfectacionRepository repository;

    @Override
    public boolean hasAprobadaByInmuebleId(Long inmuebleId) {
        if (inmuebleId == null) return false;
        return repository.existsByInmuebleIdAndEstadoAndDeletedFalse(inmuebleId, EstadoAfectacion.APROBADA);
    }
}
