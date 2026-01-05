package com.escom.administradordonaciones.donacion.core.business.output;

import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import com.escom.administradordonaciones.donacion.core.entity.Persona;

import java.util.List;
import java.util.Optional;

public interface DonacionRepository {
    List<Donacion> findDonacionesByIdPersona(Integer idPersona);
    List<Donacion>findAllDonaciones();
    List<Incidencia> findAllIncidenciasInDonacion();
    List<Persona>findAllPersonasWithoutAdmin();
    Persona save(Persona persona);
    void saveRol(Persona persona);
    Optional<Persona> findPersonaById(Integer idPersona);
    void delete(Integer idPersona);
    void deleteRol(Integer idPersona);
    void saveIncidencia(Incidencia incidencia);
    void updateIncidenciaEstado(Integer idIncidencia);
}
