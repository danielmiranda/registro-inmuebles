package com.danielmiranda.backend.persona.mapper;

import com.danielmiranda.backend.persona.dto.PersonaCreateUpdateDTO;
import com.danielmiranda.backend.persona.PersonaResponseDTO;
import com.danielmiranda.backend.persona.model.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonaMapper {
    Persona toPersona(PersonaCreateUpdateDTO dto);

    void updatePersonaFromDto(PersonaCreateUpdateDTO dto, @MappingTarget Persona persona);

    PersonaResponseDTO toPersonaResponseDTO(Persona persona);
}
