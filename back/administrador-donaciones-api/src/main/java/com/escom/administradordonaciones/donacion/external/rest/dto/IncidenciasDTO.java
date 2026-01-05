package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IncidenciasDTO {
    @JsonProperty
    private Integer idIncidencia;
    @JsonProperty
    private String tipoIncidencia;
    @JsonProperty
    private String problema;
    @JsonProperty
    private Integer idEstado;
    @JsonProperty
    private String estado;
    @JsonProperty
    private Boolean marcarComoResuelta;
    @JsonProperty
    private Boolean eliminar;

    public static IncidenciasDTO fromEntity(Incidencia incidencia) {
        return IncidenciasDTO.builder()
                .idIncidencia(incidencia.getIdIncidencia())
                .tipoIncidencia(incidencia.getTipoIncidencia())
                .problema(incidencia.getProblema())
                .idEstado(incidencia.getIdEstado())
                .estado(incidencia.getEstado())
                .marcarComoResuelta(incidencia.getMarcarComoResuelta())
                .eliminar(incidencia.getEliminar())
                .build();
    }
}
