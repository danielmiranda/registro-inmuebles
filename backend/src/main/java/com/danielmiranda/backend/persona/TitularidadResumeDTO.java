package com.danielmiranda.backend.persona;

import com.danielmiranda.backend.inmueble.InmuebleResumeDTO;

public record TitularidadResumeDTO(
        Long id,
        Integer numerador,
        Integer denominador,
        Double porcentaje, // Campo calculado útil para el front
        InmuebleResumeDTO inmueble
) {
}
