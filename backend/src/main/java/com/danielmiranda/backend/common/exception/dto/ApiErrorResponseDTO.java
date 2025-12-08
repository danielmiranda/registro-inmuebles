package com.danielmiranda.backend.common.exception.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ApiErrorResponseDTO(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        List<String> details // Para errores de validación (campo X es obligatorio, etc.)
) {
    // Constructor de ayuda para errores simples sin lista de detalles
    public ApiErrorResponseDTO(int status, String error, String message) {
        this(LocalDateTime.now(), status, error, message, null);
    }

    // Constructor de ayuda para errores con detalles
    public ApiErrorResponseDTO(int status, String error, String message, List<String> details) {
        this(LocalDateTime.now(), status, error, message, details);
    }
}
