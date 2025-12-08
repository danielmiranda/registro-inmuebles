package com.danielmiranda.backend.ubicacion.mapper;

import com.danielmiranda.backend.ubicacion.UbicacionResponseDTO;
import com.danielmiranda.backend.ubicacion.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UbicacionMapper {
    UbicacionResponseDTO toDTO(Ciudad ciudad);

    UbicacionResponseDTO.DepartamentoDTO toDepartamentoInfo(Departamento departamento);

    UbicacionResponseDTO.RegionDTO toRegionInfo(Region region);

    UbicacionResponseDTO.ProvinciaDTO toProvinciaInfo(Provincia provincia);
}
