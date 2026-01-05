package com.escom.administradordonaciones.donacion.external.jpa.repository;

import com.escom.administradordonaciones.donacion.external.jpa.model.IncidenciaJpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IncidenciaJpaRepository extends JpaRepository<IncidenciaJpa,Integer> {

    @Modifying
    @Query(" update IncidenciaJpa i set i.idEstado = 2 where i.id =:idIncidencia ")
    void updateIncidenciaInEstadoResueltaById(@Param("idIncidencia")Integer idIncidencia);
}
