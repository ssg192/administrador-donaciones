package com.escom.administradordonaciones.donacion.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class Incidencia {
    private Integer idIncidencia;
    private String tipoIncidencia;
    private Integer idTipoIncidencia;
    private String problema;
    private Integer idEstado;
    private String estado;

    //acciones
    private Boolean marcarComoResuelta;
    private Boolean eliminar;
}
