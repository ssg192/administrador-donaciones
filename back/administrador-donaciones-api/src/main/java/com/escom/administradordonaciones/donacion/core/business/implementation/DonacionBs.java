package com.escom.administradordonaciones.donacion.core.business.implementation;

import com.escom.administradordonaciones.donacion.core.business.input.DonacionService;
import com.escom.administradordonaciones.donacion.core.business.output.DonacionRepository;
import com.escom.administradordonaciones.donacion.core.entity.Catalogo;
import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.escom.administradordonaciones.donacion.core.enums.EstadoDonacionEnum;
import com.escom.administradordonaciones.donacion.core.enums.EstadoIncidenciaEnum;
import com.escom.administradordonaciones.donacion.core.enums.RolesEnum;
import com.escom.administradordonaciones.donacion.util.error.ErrorCodeEnum;
import io.vavr.control.Either;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;

import java.util.List;

@ApplicationScoped
public class DonacionBs implements DonacionService {

    private final DonacionRepository donacionRepository;

    @Inject
    public DonacionBs(DonacionRepository donacionRepository) {
        this.donacionRepository = donacionRepository;
    }

    @Override
    public List<Donacion> listDonacionesByIdPersona(Integer idPersona) {
      var donaciones = donacionRepository.findDonacionesByIdPersona(idPersona);
        return asignacionEstadoDonacion(donaciones);
    }

    @Override
    public List<Donacion> listAllDonaciones(Integer idRol) {
        var donaciones = donacionRepository.findAllDonaciones();
        donaciones.forEach(donacion -> {
            if (RolesEnum.ADMIN.getId().equals(idRol) && EstadoDonacionEnum.ACTIVO.getId().equals(donacion.getIdEstado())){
                donacion.setEditar(Boolean.TRUE);
                donacion.setEliminar(Boolean.TRUE);
            } else {
                donacion.setEditar(Boolean.FALSE);
                donacion.setEliminar(Boolean.FALSE);
            }
        });
        return donaciones;
    }


    @Override
    public List<Incidencia> listAllIncidenciasInDonacion() {
        var searchIncidencias = donacionRepository.findAllIncidenciasInDonacion();
        searchIncidencias.forEach(incidencia -> {
            if (incidencia.getIdEstado().equals(EstadoIncidenciaEnum.POR_RESOLVER.getId())) {
                incidencia.setMarcarComoResuelta(Boolean.TRUE);
                incidencia.setEliminar(Boolean.FALSE);
            }else{
                incidencia.setMarcarComoResuelta(Boolean.FALSE);
                incidencia.setEliminar(Boolean.TRUE);
            }
        });
        return searchIncidencias;
    }

    @Override
    public List<Persona> listAllPersonasWithoutAdmin() {
        var searchPersonas = donacionRepository.findAllPersonasWithoutAdmin();
        searchPersonas.forEach(persona -> persona.setEliminar(Boolean.TRUE));
        return searchPersonas;
    }

    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> createPersona(Persona persona) {
       var personal = donacionRepository.save(Persona.builder()
               .nombre(persona.getNombre())
               .primerApellido(persona.getPrimerApellido())
               .segundoApellido(persona.getSegundoApellido())
               .correo(persona.getCorreo())
               .email(persona.getEmail())
               .password(hashPassword(persona.getPassword()))
               .build());
     donacionRepository.saveRol(Persona.builder().idRol(RolesEnum.NECESITADOR.getId())
             .idPersona(personal.getIdPersona()).build());
     return Either.right(true);
    }


    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> updatePersona(Integer idPersona, Persona persona) {

        var searchPersona = donacionRepository.findPersonaById(idPersona);
        if (searchPersona.isEmpty()) {
            return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
        }
        var personaExistente = searchPersona.get();

        if (persona.getPasswordNueva() != null &&
            !isPasswordValid(persona.getPassword(), personaExistente.getPassword())) {
            return Either.left(ErrorCodeEnum.CE_RNS001);
        }

        if (persona.getNombre() != null) {
            personaExistente.setNombre(persona.getNombre());
        }
        if (persona.getPrimerApellido() != null) {
            personaExistente.setPrimerApellido(persona.getPrimerApellido());
        }
        if (persona.getSegundoApellido() != null) {
            personaExistente.setSegundoApellido(persona.getSegundoApellido());
        }
        if (persona.getCorreo() != null) {
            personaExistente.setCorreo(persona.getCorreo());
        }

        if (persona.getPasswordNueva() != null) {
            personaExistente.setPassword(hashPassword(persona.getPasswordNueva()));
        }
        donacionRepository.save(personaExistente);
        return Either.right(true);
    }


    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> deletePersona(Integer idPersona) {
        var searchPersona = donacionRepository.findPersonaById(idPersona);
        if(searchPersona.isEmpty()) {
            return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
        }
        donacionRepository.deleteRol(idPersona);
        donacionRepository.delete(idPersona);
        return Either.right(true);
    }

    @Override
    public Either<ErrorCodeEnum, Persona> getPersonaById(Integer idPersona) {
        var searchPersona =  donacionRepository.findPersonaById(idPersona);
        return searchPersona.<Either<ErrorCodeEnum, Persona>>map(Either::right).orElseGet(() -> Either.left(ErrorCodeEnum.CE_NOT_FOUND));
    }

    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> createIncidencia(Incidencia incidencia) {
        donacionRepository.saveIncidencia(Incidencia.builder()
                .idTipoIncidencia(incidencia.getIdTipoIncidencia())
                .problema(incidencia.getProblema())
                .idEstado(EstadoIncidenciaEnum.POR_RESOLVER.getId())
                .build());
        return Either.right(true);
    }

    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> updateIncidenciaInEstadoResueltaById(Integer idIncidencia) {
        if(idIncidencia == null) {
            return Either.left(ErrorCodeEnum.CE_RNS001);
        }
        donacionRepository.updateIncidenciaEstado(idIncidencia);
        return Either.right(true);
    }

    @Override
    public Either<ErrorCodeEnum, Persona> getAccessPersonaByCorreoElectronicoAndPassword(String correoElectronico, String password) {
        var searchPersona = donacionRepository.findInformacionUserByCorreo(correoElectronico);
        if(searchPersona.isEmpty()) {
            return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
        }
        if(isPasswordValid(password,searchPersona.get().getPassword())){
            return Either.right(searchPersona.get());
        }
        return Either.left(ErrorCodeEnum.CE_RNN003);
    }

    @Override
    public List<Catalogo> listTiposDonacion() {
        return donacionRepository.findTiposDonacion();
    }

    @Override
    public List<Catalogo> listTipoIncidencia() {
        return donacionRepository.findTipoIncidencia();
    }

    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> createDonacion(Donacion donacion) {
        donacionRepository.saveDonacion(Donacion.builder().idPersona(donacion.getIdPersona())
                .idTipoDonacion(donacion.getIdTipoDonacion()).idEstado(EstadoDonacionEnum.ACTIVO.getId())
                .descripcion(donacion.getDescripcion()).latitud(donacion.getLatitud())
                .longitud(donacion.getLongitud()).profundidad(donacion.getProfundidad()).build());
        return Either.right(true);
    }

    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> updateDonacion(Integer idDonacion,Donacion donacion) {
       var searchDonacion = donacionRepository.findByIdDonacion(idDonacion);
       if(searchDonacion.isEmpty()) {
           return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
       }
       searchDonacion.get().setIdDonacion(searchDonacion.get().getIdDonacion());
       searchDonacion.get().setIdTipoDonacion(donacion.getIdTipoDonacion());
       searchDonacion.get().setDescripcion(donacion.getDescripcion());
       searchDonacion.get().setLatitud(donacion.getLatitud());
       searchDonacion.get().setLongitud(donacion.getLongitud());
       searchDonacion.get().setProfundidad(donacion.getProfundidad());
       searchDonacion.get().setIdPersona(searchDonacion.get().getIdPersona());
       searchDonacion.get().setIdEstado(searchDonacion.get().getIdEstado());
       donacionRepository.saveDonacion(searchDonacion.get());
       return Either.right(true);
    }

    @Override
    @Transactional
    public Either<ErrorCodeEnum, Boolean> deleteDonacion(Integer idDonacion) {
        var searchDonacion = donacionRepository.findByIdDonacion(idDonacion);
        if(searchDonacion.isEmpty()) {
            return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
        }
        donacionRepository.deleteDonacion(idDonacion);
        return Either.right(true);
    }

    @Override
    public Either<ErrorCodeEnum, Boolean> updateDonacionInEstadoInactiva(Integer idDonacion) {
        var searchDonacion = donacionRepository.findByIdDonacion(idDonacion);
        if(searchDonacion.isEmpty()) {
            return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
        }
        if(donacionRepository.existDonacionInEstadoInactivoById(idDonacion)) {
            return Either.left(ErrorCodeEnum.CE_RNS002);
        }
        donacionRepository.updateDonacionInEstadoInactivoById(idDonacion);
        return Either.right(true);
    }

    @Override
    public Either<ErrorCodeEnum, Boolean> updateDonacionInEstadoActiva(Integer idDonacion) {
        var searchDonacion = donacionRepository.findByIdDonacion(idDonacion);
        if(searchDonacion.isEmpty()) {
            return Either.left(ErrorCodeEnum.CE_NOT_FOUND);
        }
        if(donacionRepository.existDonacionInEstadoActivaById(idDonacion)) {
            return Either.left(ErrorCodeEnum.CE_RNS002);
        }
        donacionRepository.updateDonacionInEstadoActivaById(idDonacion);
        return Either.right(true);
    }

    @Override
    public Either<ErrorCodeEnum, Donacion> getDonacionById(Integer idDonacion) {
        var searchDonacion =  donacionRepository.findByIdDonacion(idDonacion);
        return searchDonacion.<Either<ErrorCodeEnum, Donacion>>map(Either::right).orElseGet(() -> Either.left(ErrorCodeEnum.CE_NOT_FOUND));
    }

    @Override
    public Either<ErrorCodeEnum, Boolean> deleteIncidenciaById(Integer idIncidencia) {
        var searchIncidencia= donacionRepository.existIncidenciaById(idIncidencia);
        if(searchIncidencia) {
            donacionRepository.deleteIncidencia(idIncidencia);
            return Either.right(true);
        }
        return Either.left(ErrorCodeEnum.CE_RNS002);
    }


    private List<Donacion> asignacionEstadoDonacion(List<Donacion> donaciones) {
        donaciones.forEach(donacion-> {
            if(donacion.getIdEstado().equals(EstadoDonacionEnum.ACTIVO.getId())) {
                donacion.setEditar(Boolean.TRUE);
                donacion.setEliminar(Boolean.TRUE);
                donacion.setBajaPublicacion(Boolean.TRUE);
                donacion.setSubirPublicacion(Boolean.FALSE);
            }else{
                donacion.setEditar(Boolean.FALSE);
                donacion.setEliminar(Boolean.FALSE);
                donacion.setBajaPublicacion(Boolean.FALSE);
                donacion.setSubirPublicacion(Boolean.TRUE);
            }
        });
        return donaciones;
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    private boolean isPasswordValid(String passwordAnterior, String passwordHasheada) {
        return BCrypt.checkpw(passwordAnterior,passwordHasheada);
    }
}
