package com.danielmiranda.backend.afectacion.dto;

import com.danielmiranda.backend.afectacion.model.EstadoAfectacion;

import java.time.LocalDate;

public record AfectacionResponseDTO(
        Long id,
        Long personaId,
        Long inmuebleId,
        EstadoAfectacion estado,
        String nroExpediente,
        LocalDate fecha
) {}
