package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PersonaDTO {
    @JsonProperty
    private String nombre;
    @JsonProperty
    private String primerApellido;
    @JsonProperty
    private String segundoApellido;
    @JsonProperty
    private String correoElectronico;
    @JsonProperty
    private String password;

    public Persona toEntity(){
        return Persona.builder()
                .nombre(nombre)
                .primerApellido(primerApellido)
                .segundoApellido(segundoApellido)
                .correo(correoElectronico)
                .password(password)
                .build();
    }
}
