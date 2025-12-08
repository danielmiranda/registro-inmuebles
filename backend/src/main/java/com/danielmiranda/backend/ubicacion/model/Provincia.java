package com.danielmiranda.backend.ubicacion.model;

import com.danielmiranda.backend.common.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Provincia extends BaseEntity {
    private String nombre;
    private Integer codigoProvincia;
}
