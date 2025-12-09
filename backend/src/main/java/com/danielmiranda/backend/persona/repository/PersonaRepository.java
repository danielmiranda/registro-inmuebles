package com.danielmiranda.backend.persona.repository;

import com.danielmiranda.backend.persona.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
    List<Persona> findAllByDeletedFalse();
    Optional<Persona> findByIdAndDeletedFalse(Long id);
    boolean existsByCuitAndDeletedFalse(String cuit);
    Optional<Persona> findByCuitAndDeletedFalse(String cuit);
}
