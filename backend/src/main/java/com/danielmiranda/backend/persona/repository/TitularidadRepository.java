package com.danielmiranda.backend.persona.repository;

import com.danielmiranda.backend.persona.model.Titularidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TitularidadRepository extends JpaRepository<Titularidad, Long> {
    List<Titularidad> findAllByDeletedFalse();

    Optional<Titularidad> findByIdAndDeletedFalse(Long id);

    List<Titularidad> findAllByPersona_IdAndDeletedFalse(Long personaId);

    List<Titularidad> findAllByInmuebleIdAndDeletedFalse(Long inmuebleId);

    boolean existsByPersona_IdAndInmuebleIdAndDeletedFalse(Long personaId, Long inmuebleId);
}
