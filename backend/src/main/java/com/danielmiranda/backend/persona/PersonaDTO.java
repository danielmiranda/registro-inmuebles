package com.danielmiranda.backend.persona;

import java.util.List;

public record PersonaDTO(
        Long id,
        String cuit,
        String nombre,
        String apellido,
        // Usamos un DTO "resumido" aquí para no generar bucles infinitos
        List<TitularidadResumeDTO> titularidades

) {

}
