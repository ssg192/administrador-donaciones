package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DonacionesDTO {
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
    private Boolean editar;
    @JsonProperty
    private Boolean eliminar;

    public static DonacionesDTO fromEntity(Donacion donacion) {
        return DonacionesDTO.builder()
                .idDonacion(donacion.getIdDonacion())
                .tipoDonacion(donacion.getTipoDonacion())
                .descripcion(donacion.getDescripcion())
                .idEstado(donacion.getIdEstado())
                .estado(donacion.getEstado())
                .editar(donacion.getEditar())
                .eliminar(donacion.getEliminar())
                .build();
    }
}
