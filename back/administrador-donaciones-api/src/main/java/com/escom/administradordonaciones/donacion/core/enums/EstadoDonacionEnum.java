package com.escom.administradordonaciones.donacion.core.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum EstadoDonacionEnum {

    ACTIVO(1,"Activo");

    private Integer id;
    private String descripcion;

}
