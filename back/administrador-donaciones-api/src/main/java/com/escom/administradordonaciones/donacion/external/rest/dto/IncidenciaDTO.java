package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class IncidenciaDTO {
    @JsonProperty
    private Integer idTipoIncidencia;
    @JsonProperty
    private String descripcion;

    public Incidencia toEntity() {
        return Incidencia.builder()
                .idTipoIncidencia(idTipoIncidencia)
                .problema(descripcion)
                .build();
    }
}
