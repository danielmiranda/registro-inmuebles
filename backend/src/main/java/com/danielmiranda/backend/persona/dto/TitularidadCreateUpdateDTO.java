package com.danielmiranda.backend.persona.dto;

public record TitularidadCreateUpdateDTO(
        Long personaId,
        Long inmuebleId,
        Integer numerador,
        Integer denominador
) {
}
