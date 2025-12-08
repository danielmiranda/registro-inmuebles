package com.danielmiranda.backend.afectacion.model;

import com.danielmiranda.backend.common.BaseEntity;
import com.danielmiranda.backend.inmueble.model.Inmueble;
import jakarta.persistence.*;
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

    // Dueño de la relación (Foreign Key en esta tabla)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inmueble_id", unique = true, nullable = false)
    private Inmueble inmueble;
}
