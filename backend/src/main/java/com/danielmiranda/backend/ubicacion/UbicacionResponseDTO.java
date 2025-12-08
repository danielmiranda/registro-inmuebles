package com.danielmiranda.backend.ubicacion;

public record UbicacionResponseDTO(
) {

    public record CiudadDTO(
            Long id,
            String nombre,
            Integer codigoCiudad,
            DepartamentoDTO departamento
    ) {}
    public record DepartamentoDTO(
            Long id,
            String nombre,
            Integer codigoDepartamento,
            RegionDTO region
    ) {}

    public record RegionDTO(
            Long id,
            String nombre,
            ProvinciaDTO provincia
    ) {}

    public record ProvinciaDTO(
            Long id,
            String nombre,
            Integer codigoProvincia
    ) {}
}
