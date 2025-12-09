package com.danielmiranda.backend.persona.api;

import java.util.Optional;

/**
 * Puerto para verificar la existencia de Persona activa (no eliminada)
 * desde otros módulos sin acoplarse al modelo de Persona.
 */
public interface PersonaAccess {
    boolean existsActiveById(Long personaId);
}
