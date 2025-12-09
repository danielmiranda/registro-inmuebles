package com.danielmiranda.backend.persona;

public record PersonaCreateUpdateDTO(
        String cuit,
        String nombre,
        String apellido
) {
}
