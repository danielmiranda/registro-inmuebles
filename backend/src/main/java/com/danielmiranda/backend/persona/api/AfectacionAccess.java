package com.danielmiranda.backend.persona.api;

/**
 * Puerto para consultar si un inmueble tiene afectación aprobada como bien de familia.
 */
public interface AfectacionAccess {
    boolean hasAprobadaByInmuebleId(Long inmuebleId);
}
