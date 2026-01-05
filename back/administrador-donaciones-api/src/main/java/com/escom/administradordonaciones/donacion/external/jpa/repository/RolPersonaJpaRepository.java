package com.escom.administradordonaciones.donacion.external.jpa.repository;

import com.escom.administradordonaciones.donacion.external.jpa.model.RolPersonaIdJpa;
import com.escom.administradordonaciones.donacion.external.jpa.model.RolPersonaJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolPersonaJpaRepository extends JpaRepository<RolPersonaJpa,RolPersonaIdJpa> {
    void deleteById_idPersona(Integer persona);
}
