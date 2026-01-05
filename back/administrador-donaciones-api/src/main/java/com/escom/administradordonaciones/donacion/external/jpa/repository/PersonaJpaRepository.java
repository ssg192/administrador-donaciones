package com.escom.administradordonaciones.donacion.external.jpa.repository;

import com.escom.administradordonaciones.donacion.external.jpa.model.PersonaJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaJpaRepository extends JpaRepository<PersonaJpa,Integer> {
}
