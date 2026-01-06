package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public class getDonacionDTO {
    @JsonProperty
    private Integer idTipoDonacion;
    @JsonProperty
    private String descripcion;
    @JsonProperty
    private BigDecimal latitud;
    @JsonProperty
    private BigDecimal longitud;

    public static getDonacionDTO fromEntity(Donacion donacion) {
        return getDonacionDTO.builder()
                .idTipoDonacion(donacion.getIdTipoDonacion())
                .descripcion(donacion.getDescripcion())
                .latitud(donacion.getLatitud())
                .longitud(donacion.getLongitud())
                .build();
    }
}
