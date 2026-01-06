package com.escom.administradordonaciones.donacion.external.jpa.repository;

import com.escom.administradordonaciones.donacion.external.jpa.model.DonacionJpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DonacionJpaRepository extends JpaRepository<DonacionJpa,Integer> {

    @Modifying
    @Query("update DonacionJpa d set d.idEstado = 2 where d.id = :idDonacion")
    void updateDonacionInEstadoInactivoById(@Param("idDonacion")Integer idDonacion);


    @Modifying
    @Query("update DonacionJpa d set d.idEstado = 1 where d.id = :idDonacion")
    void updateDonacionInEstadoActivaById(@Param("idDonacion")Integer idDonacion);


}
