package com.danielmiranda.backend.persona.dto;

public record PersonaCreateUpdateDTO(
        String cuit,
        String nombre,
        String apellido
) {
}
