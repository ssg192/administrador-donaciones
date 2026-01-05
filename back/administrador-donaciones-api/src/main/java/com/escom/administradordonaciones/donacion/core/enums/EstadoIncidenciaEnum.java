package com.escom.administradordonaciones.donacion.core.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EstadoIncidenciaEnum {
    POR_RESOLVER(1,"Por resolver"),
    RESUELTA(2,"Resuelta");
    private Integer id;
    private String descripcion;

}
