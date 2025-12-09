package com.danielmiranda.backend.persona;

public record TitularidadResponseDTO(
        Long id,
        Long personaId,
        Long inmuebleId,
        Integer numerador,
        Integer denominador,
        Double porcentaje
) {
}
