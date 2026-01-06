package com.escom.administradordonaciones.donacion.external.rest.dto;

import com.escom.administradordonaciones.donacion.core.entity.Catalogo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CatalogoDTO {
    @JsonProperty
    private  Integer id;
    @JsonProperty
    private String nombre;

    public static CatalogoDTO fromEntity(Catalogo catalogo) {
        return CatalogoDTO.builder()
                .id(catalogo.getId())
                .nombre(catalogo.getNombre())
                .build();
    }

}
