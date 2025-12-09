package com.danielmiranda.backend.inmueble.service;

import com.danielmiranda.backend.inmueble.InmuebleDTO;
import com.danielmiranda.backend.inmueble.InmuebleResponseDTO;
import com.danielmiranda.backend.inmueble.mapper.InmuebleMapper;
import com.danielmiranda.backend.inmueble.model.Inmueble;
import com.danielmiranda.backend.inmueble.repository.InmuebleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InmuebleService {
    private final InmuebleRepository repository;
    private final InmuebleMapper mapper;

    public List<InmuebleResponseDTO> findAll(){
        return repository.findAll().stream()
                .map(mapper::toInmuebleResponseDTO)
                .toList();
    }

    public InmuebleResponseDTO create(InmuebleDTO inmuebleDTO) {
        Inmueble inmueble = mapper.toInmueble(inmuebleDTO);
        Inmueble saved = repository.save(inmueble);
        return mapper.toInmuebleResponseDTO(saved);
    }
}
