package com.escom.administradordonaciones.donacion.external.jpa.repository;

import com.escom.administradordonaciones.donacion.external.jpa.model.DonacionJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonacionJpaRepository extends JpaRepository<DonacionJpa,Integer> {
}
