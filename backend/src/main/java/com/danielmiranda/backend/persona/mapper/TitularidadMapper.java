package com.danielmiranda.backend.persona.mapper;

import com.danielmiranda.backend.persona.model.Titularidad;
import com.danielmiranda.backend.persona.dto.TitularidadCreateUpdateDTO;
import com.danielmiranda.backend.persona.TitularidadResponseDTO;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TitularidadMapper {

    @BeanMapping(ignoreByDefault = true)
    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "personaId", source = "persona.id"),
            @Mapping(target = "inmuebleId", source = "inmuebleId"),
            @Mapping(target = "numerador", source = "numerador"),
            @Mapping(target = "denominador", source = "denominador"),
            @Mapping(target = "porcentaje", expression = "java(entity.getPorcentaje())"),
            @Mapping(target = "afectacionAprobada", expression = "java(afectacionAprobada)")
    })
    TitularidadResponseDTO toResponseDTO(Titularidad entity, @Context boolean afectacionAprobada);

    @BeanMapping(ignoreByDefault = true)
    @Mappings({
            @Mapping(target = "inmuebleId", source = "inmuebleId"),
            @Mapping(target = "numerador", source = "numerador"),
            @Mapping(target = "denominador", source = "denominador")
    })
    void updateEntityFromDto(TitularidadCreateUpdateDTO dto, @MappingTarget Titularidad entity);

}
