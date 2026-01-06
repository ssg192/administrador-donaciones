package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AccesoDTO {
    @JsonProperty
    private String correoElectronico;
    @JsonProperty
    private String password;

    public Persona toEntity() {
        return Persona.builder()
                .password(password)
                .correo(correoElectronico)
                .build();
    }
}
