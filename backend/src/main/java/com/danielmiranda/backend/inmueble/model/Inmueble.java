package com.danielmiranda.backend.inmueble.model;

import com.danielmiranda.backend.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Inmueble extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String matricula;

    @Column(unique = true, nullable = false)
    private String nomenclatura;

    // Relación con Ubicación
    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "ciudad_id")
    private Integer ciudadId;

    // Relación bidireccional con Afectación (Opcional: 0..1)
    //@OneToOne(mappedBy = "inmueble", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //private AfectacionVivienda afectacion;

    // Relación con Titularidad (Se suele mapear aquí solo si necesitas hacer queries desde Inmueble)
    //@OneToMany(mappedBy = "inmueble", fetch = FetchType.LAZY)
    //private List<Titularidad> titulares = new ArrayList<>();

    // Métodos de conveniencia
    //public boolean estaAfectado() {
    //    return this.afectacion != null &&
    //            this.afectacion.getEstado() == EstadoAfectacion.APROBADA;
    //}
}
