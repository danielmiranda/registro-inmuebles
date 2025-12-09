package com.danielmiranda.backend.afectacion.model;

import com.danielmiranda.backend.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter  @Setter
@AllArgsConstructor @NoArgsConstructor
public class AfectacionVivienda extends BaseEntity {

    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    private EstadoAfectacion estado;

    private String nroExpediente;

    // Referencias por identidad para evitar acoplamiento entre módulos
    @Column(name = "persona_id", nullable = false)
    private Long personaId;

    @Column(name = "inmueble_id", nullable = false)
    private Long inmuebleId;
}
