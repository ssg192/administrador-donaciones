package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PersonaAcessoDTO {
    @JsonProperty
    private Integer idPersona;
    @JsonProperty
    private Integer idRol;

    public static PersonaAcessoDTO fromEntity(Persona persona){
        return PersonaAcessoDTO.builder()
                .idPersona(persona.getIdPersona())
                .idRol(persona.getIdRol())
                .build();
    }
}
