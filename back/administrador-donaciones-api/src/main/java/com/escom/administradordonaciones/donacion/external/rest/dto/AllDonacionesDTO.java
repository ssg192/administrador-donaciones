package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class AllDonacionesDTO {
    @JsonProperty
    private Integer idDonacion;
    @JsonProperty
    private String tipoDonacion;
    @JsonProperty
    private String descripcion;
    @JsonProperty
    private Integer idEstado;
    @JsonProperty
    private String estado;
    @JsonProperty
    private BigDecimal latitud;
    @JsonProperty
    private BigDecimal longitud;
    @JsonProperty
    private BigDecimal profundidad;
    @JsonProperty
    private Boolean editar;
    @JsonProperty
    private Boolean eliminar;

    public static AllDonacionesDTO fromEntity(Donacion donacion){
        return AllDonacionesDTO.builder()
                .idDonacion(donacion.getIdDonacion())
                .tipoDonacion(donacion.getTipoDonacion())
                .descripcion(donacion.getDescripcion())
                .idEstado(donacion.getIdEstado())
                .estado(donacion.getEstado())
                .latitud(donacion.getLatitud())
                .longitud(donacion.getLongitud())
                .profundidad(donacion.getProfundidad())
                .editar(donacion.getEditar())
                .eliminar(donacion.getEliminar())
                .build();
    }
}
