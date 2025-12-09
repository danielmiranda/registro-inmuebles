package com.danielmiranda.backend.inmueble.mapper;

import com.danielmiranda.backend.inmueble.InmuebleDTO;
import com.danielmiranda.backend.inmueble.InmuebleResponseDTO;
import com.danielmiranda.backend.inmueble.model.Inmueble;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InmuebleMapper {
    InmuebleResponseDTO toInmuebleResponseDTO(Inmueble inmueble);
    Inmueble toInmueble(InmuebleDTO inmuebleDTO);
}
