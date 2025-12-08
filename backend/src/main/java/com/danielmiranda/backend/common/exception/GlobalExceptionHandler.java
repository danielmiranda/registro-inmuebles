package com.danielmiranda.backend.common.exception;

import com.danielmiranda.backend.common.exception.dto.ApiErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Manejo de Recurso No Encontrado (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponseDTO> handleResourceNotFound(ResourceNotFoundException ex) {
        ApiErrorResponseDTO error = new ApiErrorResponseDTO(
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // 2. Manejo de Reglas de Negocio (400)
    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ApiErrorResponseDTO> handleBusinessRule(BusinessRuleException ex) {
        ApiErrorResponseDTO error = new ApiErrorResponseDTO(
                HttpStatus.BAD_REQUEST.value(),
                "Business Validation Error",
                ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // 3. Manejo de Duplicados (409)
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiErrorResponseDTO> handleDuplicate(DuplicateResourceException ex) {
        ApiErrorResponseDTO error = new ApiErrorResponseDTO(
                HttpStatus.CONFLICT.value(),
                "Resource Conflict",
                ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    // 4. Manejo de Validaciones de Spring (@Valid en DTOs)
    // Esto captura cuando @NotBlank, @Size, etc. fallan
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponseDTO> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> details = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();

        ApiErrorResponseDTO error = new ApiErrorResponseDTO(
                HttpStatus.BAD_REQUEST.value(),
                "Validation Failed",
                "La solicitud tiene errores de formato",
                details
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // 5. Manejo de Errores Inesperados (500)
    // "El Catch-All": Para que el usuario nunca vea un stack trace feo
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponseDTO> handleGlobalException(Exception ex) {
        // Aquí podrías agregar un LOG.error(ex.getMessage(), ex);
        ApiErrorResponseDTO error = new ApiErrorResponseDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "Ocurrió un error inesperado en el servidor. Contacte al administrador."
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}