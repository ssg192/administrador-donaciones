package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PersonalDTO {
    @JsonProperty
    private Integer idPersona;
    @JsonProperty
    private String nombre;
    @JsonProperty
    private Boolean eliminar;
    public static PersonalDTO fromEntity(Persona persona) {
        return PersonalDTO.builder()
                .idPersona(persona.getIdPersona())
                .nombre(persona.getNombre())
                .eliminar(persona.getEliminar())
                .build();
    }
}
