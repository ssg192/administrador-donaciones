package com.escom.administradordonaciones.donacion.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Builder
@Setter
public class Donacion {
    private Integer idDonacion;
    private String descripcion;
    private String tipoDonacion;
    private Integer idEstado;
    private String estado;
    private BigDecimal latitud;
    private BigDecimal longitud;
    private BigDecimal profundidad;

    //acciones
    private Boolean editar;
    private Boolean eliminar;
}
