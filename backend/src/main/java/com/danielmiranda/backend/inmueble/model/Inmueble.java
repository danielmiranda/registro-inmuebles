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


    private Integer ciudadId;

    private Integer departamentoId;

}
