package com.danielmiranda.backend.ubicacion.mapper;

import com.danielmiranda.backend.ubicacion.UbicacionResponseDTO;
import com.danielmiranda.backend.ubicacion.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UbicacionMapper {
    UbicacionResponseDTO toDTO(Ciudad ciudad);

    UbicacionResponseDTO.DepartamentoDTO toDepartamentoDTO(Departamento departamento);

    UbicacionResponseDTO.RegionDTO toRegionDTO(Region region);

    UbicacionResponseDTO.ProvinciaDTO toProvinciaDTO(Provincia provincia);
}
