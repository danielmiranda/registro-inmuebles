package com.danielmiranda.backend.persona.model;

import com.danielmiranda.backend.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Persona extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String cuit; // O DNI

    private String nombre;
    private String apellido;

    // Relación inversa para ver qué propiedades tiene
    @OneToMany(mappedBy = "persona", fetch = FetchType.LAZY)
    private List<Titularidad> titularidades = new ArrayList<>();
}
