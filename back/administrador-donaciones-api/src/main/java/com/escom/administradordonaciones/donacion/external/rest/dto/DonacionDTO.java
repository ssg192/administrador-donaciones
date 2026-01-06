package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class DonacionDTO {
    @JsonProperty
    private Integer idPersona;
    @JsonProperty
    private Integer idTipoDonacion;
    @JsonProperty
    private String descripcion;
    @JsonProperty
    private BigDecimal latitud;
    @JsonProperty
    private BigDecimal longitud;
    @JsonProperty
    private BigDecimal profundidad;

    public Donacion toEntity() {
        return Donacion.builder()
                .descripcion(descripcion)
                .idPersona(idPersona)
                .idTipoDonacion(idTipoDonacion)
                .latitud(latitud)
                .longitud(longitud)
                .profundidad(profundidad)
                .build();
    }
}
