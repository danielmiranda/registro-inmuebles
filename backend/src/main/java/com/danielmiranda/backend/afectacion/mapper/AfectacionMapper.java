package com.danielmiranda.backend.afectacion.mapper;

import com.danielmiranda.backend.afectacion.dto.AfectacionCreateUpdateDTO;
import com.danielmiranda.backend.afectacion.dto.AfectacionResponseDTO;
import com.danielmiranda.backend.afectacion.model.AfectacionVivienda;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AfectacionMapper {

    @BeanMapping(ignoreByDefault = true)
    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "personaId", source = "personaId"),
            @Mapping(target = "inmuebleId", source = "inmuebleId"),
            @Mapping(target = "estado", source = "estado"),
            @Mapping(target = "nroExpediente", source = "nroExpediente"),
            @Mapping(target = "fecha", source = "fecha")
    })
    AfectacionResponseDTO toResponseDTO(AfectacionVivienda entity);

    @BeanMapping(ignoreByDefault = true)
    @Mappings({
            @Mapping(target = "personaId", source = "personaId"),
            @Mapping(target = "inmuebleId", source = "inmuebleId"),
            @Mapping(target = "estado", source = "estado"),
            @Mapping(target = "nroExpediente", source = "nroExpediente"),
            @Mapping(target = "fecha", source = "fecha")
    })
    void updateEntityFromDto(AfectacionCreateUpdateDTO dto, @MappingTarget AfectacionVivienda entity);
}
