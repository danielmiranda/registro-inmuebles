package com.danielmiranda.backend.persona.api;

/**
 * Puerto para consultar si una Persona es titular de un Inmueble.
 */
public interface TitularidadAccess {
    boolean hasTitularidad(Long personaId, Long inmuebleId);
}
