package com.escom.administradordonaciones.donacion.core.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RolesEnum {

    ADMIN(1,"Administrador"),
    NECESITADOR(2,"Necesitado");


    private Integer id;
    private String nombre;
}
