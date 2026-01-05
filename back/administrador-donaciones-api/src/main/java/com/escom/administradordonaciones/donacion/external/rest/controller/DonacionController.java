package com.escom.administradordonaciones.donacion.external.rest.controller;


import com.escom.administradordonaciones.donacion.core.business.input.DonacionService;
import com.escom.administradordonaciones.donacion.external.rest.dto.*;
import com.escom.administradordonaciones.donacion.util.error.ErrorCode;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
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
    public Response listDonacionesByIdPersona(@PathParam("idPersona")Integer idPersona) {
        return Response.ok(donacionService.listDonacionesByIdPersona(idPersona).stream().map(DonacionesDTO::fromEntity).toList()).build();
    }

    @GET
    @Path("/donaciones")
    public Response listDonacionesAllDonaciones(@Parameter(description = "identificador del rol",required = true) @QueryParam("idRol")Integer idRol) {
        return Response.ok(donacionService.listAllDonaciones(idRol).stream().map(AllDonacionesDTO::fromEntity).toList()).build();
    }
    @GET
    @Path("/incidencias")
    public Response listIncidenciasAllInDonaciones() {
        return Response.ok(donacionService.listAllIncidenciasInDonacion().stream().map(IncidenciasDTO::fromEntity).toList()).build();
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

}
