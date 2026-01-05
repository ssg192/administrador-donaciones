package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InformacionPersonaDTO {
    @JsonProperty
    private String nombre;
    @JsonProperty
    private String primerApellido;
    @JsonProperty
    private String segundoApellido;
    @JsonProperty
    private String correoElectronico;

    public static InformacionPersonaDTO fromEntity(Persona persona) {
        return InformacionPersonaDTO.builder()
                .nombre(persona.getNombre())
                .primerApellido(persona.getPrimerApellido())
                .segundoApellido(persona.getSegundoApellido())
                .correoElectronico(persona.getCorreo())
                .build();
    }
}
