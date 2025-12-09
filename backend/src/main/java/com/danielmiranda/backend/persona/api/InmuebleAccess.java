package com.danielmiranda.backend.persona.api;

import java.util.Optional;

/**
 * Puerto del módulo Persona para acceder a información básica de Inmueble
 * sin acoplarse a las entidades del módulo Inmueble.
 */
public interface InmuebleAccess {
    Optional<InmuebleSummaryDTO> findById(Long inmuebleId);
}
