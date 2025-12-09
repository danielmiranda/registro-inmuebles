package com.danielmiranda.backend.persona;

public record PersonaResponseDTO(
        Long id,
        String cuit,
        String nombre,
        String apellido
) {
}
