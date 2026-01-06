package com.escom.administradordonaciones.donacion.core.business.input;

import com.escom.administradordonaciones.donacion.core.entity.Catalogo;
import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.escom.administradordonaciones.donacion.util.error.ErrorCodeEnum;
import io.vavr.control.Either;

import java.util.List;

public interface DonacionService {

    List<Donacion> listDonacionesByIdPersona(Integer idPersona);
    List<Donacion>listAllDonaciones(Integer idRol);
    List<Incidencia>listAllIncidenciasInDonacion();
    List<Persona> listAllPersonasWithoutAdmin();
    Either<ErrorCodeEnum,Boolean>createPersona(Persona persona);
    Either<ErrorCodeEnum,Boolean>updatePersona(Integer idPersona, Persona persona);
    Either<ErrorCodeEnum,Boolean>deletePersona(Integer idPersona);
    Either<ErrorCodeEnum,Persona> getPersonaById(Integer idPersona);
    Either<ErrorCodeEnum,Boolean>createIncidencia(Incidencia incidencia);
    Either<ErrorCodeEnum,Boolean>updateIncidenciaInEstadoResueltaById(Integer idIncidencia);
    Either<ErrorCodeEnum,Persona>getAccessPersonaByCorreoElectronicoAndPassword(String correoElectronico,String password);
    List<Catalogo>listTiposDonacion();
    List<Catalogo>listTipoIncidencia();
    Either<ErrorCodeEnum,Boolean>createDonacion(Donacion donacion);
    Either<ErrorCodeEnum,Boolean>updateDonacion(Integer idDonacion,Donacion donacion);
    Either<ErrorCodeEnum,Boolean>deleteDonacion(Integer idDonacion);
}
