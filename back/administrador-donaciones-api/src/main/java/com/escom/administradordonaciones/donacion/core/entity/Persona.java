package com.escom.administradordonaciones.donacion.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class Persona {
    private Integer idPersona;
    private String nombre;
   private String correo;
   private String primerApellido;
   private String segundoApellido;
   private String email;
   private String password;
   private Integer idRol;
   private String passwordNueva;
   private String passwordSinHash;
    //acciones
    private Boolean eliminar;
}
