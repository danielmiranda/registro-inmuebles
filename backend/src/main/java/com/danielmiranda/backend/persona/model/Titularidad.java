package com.danielmiranda.backend.persona.model;

import com.danielmiranda.backend.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Titularidad extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "persona_id", nullable = false)
    private Persona persona;

    // Referencia por identidad para evitar acoplamiento entre módulos
    @Column(name = "inmueble_id", nullable = false)
    private Long inmuebleId;

    // Matemática de titularidad (Ej: 1/2, 100/100)
    private Integer numerador;
    private Integer denominador;

    public double getPorcentaje() {
        if (denominador == 0) return 0.0;
        return (double) numerador / denominador * 100;
    }
}
