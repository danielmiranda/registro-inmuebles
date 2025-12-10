package com.danielmiranda.backend.afectacion.repository;

import com.danielmiranda.backend.afectacion.model.AfectacionVivienda;
import com.danielmiranda.backend.afectacion.model.EstadoAfectacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AfectacionRepository extends JpaRepository<AfectacionVivienda, Long> {
    List<AfectacionVivienda> findAllByDeletedFalse();
    Optional<AfectacionVivienda> findByIdAndDeletedFalse(Long id);

    List<AfectacionVivienda> findAllByPersonaIdAndDeletedFalse(Long personaId);
    List<AfectacionVivienda> findAllByInmuebleIdAndDeletedFalse(Long inmuebleId);

    boolean existsByPersonaIdAndEstadoAndDeletedFalse(Long personaId, EstadoAfectacion estado);

    boolean existsByInmuebleIdAndEstadoAndDeletedFalse(Long inmuebleId, EstadoAfectacion estado);

    boolean existsByPersonaIdAndInmuebleIdAndDeletedFalse(Long personaId, Long inmuebleId);

    boolean existsByPersonaIdAndInmuebleIdAndIdNotAndDeletedFalse(Long personaId, Long inmuebleId, Long id);

    boolean existsByPersonaIdAndEstadoAndIdNotAndDeletedFalse(Long personaId, EstadoAfectacion estado, Long id);
}
