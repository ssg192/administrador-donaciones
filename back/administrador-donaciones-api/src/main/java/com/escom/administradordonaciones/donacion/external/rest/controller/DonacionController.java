package com.escom.administradordonaciones.donacion.external.rest.controller;


import com.escom.administradordonaciones.donacion.core.business.input.DonacionService;
import com.escom.administradordonaciones.donacion.external.rest.dto.*;
import com.escom.administradordonaciones.donacion.util.error.ErrorCode;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("donacion")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Donaciones", description = "Servicio para el módulo de donaciones")
public class DonacionController {
    private final DonacionService donacionService;

    @Inject
    public DonacionController(DonacionService donacionService) {
        this.donacionService = donacionService;
    }

    @GET
    @Path("{idPersona}/donaciones")
    public List<DonacionesDTO> listDonacionesByIdPersona(@PathParam("idPersona")Integer idPersona) {
        return donacionService.listDonacionesByIdPersona(idPersona).stream().map(DonacionesDTO::fromEntity).toList();
    }

    @GET
    @Path("/donaciones")
    public List<AllDonacionesDTO> listDonacionesAllDonaciones(@Parameter(description = "identificador del rol") @QueryParam("idRol")Integer idRol) {
        return donacionService.listAllDonaciones(idRol).stream().map(AllDonacionesDTO::fromEntity).toList();
    }
    @GET
    @Path("/incidencias")
    public List<IncidenciasDTO> listIncidenciasAllInDonaciones() {
        return donacionService.listAllIncidenciasInDonacion().stream().map(IncidenciasDTO::fromEntity).toList();
    }

    @GET
    @Path("personal")
    public List<PersonalDTO> listAllPersonalWithoutAdmin() {
        return donacionService.listAllPersonasWithoutAdmin().stream().map(PersonalDTO::fromEntity).toList();
    }

    @POST
    @Path("persona")
    public Boolean createPersona(@Valid PersonaDTO personaDTO) {
        return donacionService.createPersona(personaDTO.toEntity()).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @GET
    @Path("persona/{idPersona}")
    public InformacionPersonaDTO findPersonaById(@PathParam("idPersona")Integer idPersona) {
        return donacionService.getPersonaById(idPersona).map(InformacionPersonaDTO::fromEntity).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @PUT
    @Path("persona/{idPersona}/editar")
    public Boolean updatePersona(@PathParam("idPersona")Integer idPersona,@Valid UpdatePersonaDTO updatePersonaDTO) {
        return donacionService.updatePersona(idPersona, updatePersonaDTO.toEntity()).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @DELETE
    @Path("persona/{idPersona}/eliminar")
    public Boolean deletePersona(@PathParam("idPersona")Integer idPersona) {
       return donacionService.deletePersona(idPersona).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @POST
    @Path("incidencia")
    public Boolean createIncidencia(@Valid IncidenciaDTO incidenciaDTO) {
        return donacionService.createIncidencia(incidenciaDTO.toEntity()).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @PATCH
    @Path("{idIncidencia}/update")
    public Boolean updateIncidencia(@PathParam("idIncidencia")Integer idIncidencia){
        return donacionService.updateIncidenciaInEstadoResueltaById(idIncidencia).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @POST
    @Path("acceso")
    public PersonaAcessoDTO getCredencialesByCorreoAndPassword(@Valid AccesoDTO accesoDTO ) {
        return donacionService.getAccessPersonaByCorreoElectronicoAndPassword(accesoDTO.getCorreoElectronico(), accesoDTO.getPassword()).map(PersonaAcessoDTO::fromEntity).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @GET
    @Path("catalogo/tipo-donacion")
    public List<CatalogoDTO> listCatalogoTipoDonacion() {
        return donacionService.listTiposDonacion().stream().map(CatalogoDTO::fromEntity).toList();
    }

    @GET
    @Path("catalogo/tipo-incidencia")
    public List<CatalogoDTO> listCatalogoTipoIncidencia() {
        return donacionService.listTipoIncidencia().stream().map(CatalogoDTO::fromEntity).toList();
    }

    @POST
    public Boolean createDonacion(@Valid DonacionDTO donacionDTO) {
        return donacionService.createDonacion(donacionDTO.toEntity()).getOrElseThrow(ErrorCode::toBusinessException);
    }
    @PUT
    @Path("{idDonacion}/editar")
    public Boolean updateDonacion(@PathParam("idDonacion")Integer idDonacion,@Valid UpdateDonacionDTO updateDonacionDTO) {
        return donacionService.updateDonacion(idDonacion,updateDonacionDTO.toEntity()).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @DELETE
    @Path("{idDonacion}/eliminar")
    public Boolean deleteDonacion(@PathParam("idDonacion")Integer idDonacion) {
        return donacionService.deleteDonacion(idDonacion).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @PATCH
    @Path("{idDonacion}/volver-inactiva")
    public Boolean volverInactiva(@PathParam("idDonacion")Integer idDonacion) {
        return donacionService.updateDonacionInEstadoInactiva(idDonacion).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @PATCH
    @Path("{idDonacion}/volver-activa")
    public Boolean volverActiva(@PathParam("idDonacion")Integer idDonacion) {
        return donacionService.updateDonacionInEstadoActiva(idDonacion).getOrElseThrow(ErrorCode::toBusinessException);
    }

    @GET
    @Path("{idDonacion}")
    public getDonacionDTO getDonacionById(@PathParam("idDonacion")Integer idDonacion) {
        return donacionService.getDonacionById(idDonacion).map(getDonacionDTO::fromEntity).getOrElseThrow(ErrorCode::toBusinessException);
    }
}
