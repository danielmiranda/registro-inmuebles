package com.danielmiranda.backend.inmueble;

public record InmuebleResumeDTO(
        Long id,
        String matricula,
        String nomenclatura,
        Boolean estaAfectado
) {
}
