package com.danielmiranda.backend.inmueble;

public record InmuebleResponseDTO(
        Long id,
        String matricula,
        String nomenclatura,
        Integer ciudadId,
        Integer departamentoId
) {
}
