package com.escom.administradordonaciones.donacion.external.jpa.model;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cr04_persona_rol")
public class RolPersonaJpa {
    @EmbeddedId
    private RolPersonaIdJpa id;

    public static  RolPersonaJpa fromEntity(Persona persona) {
        return RolPersonaJpa.builder()
                .id(RolPersonaIdJpa.builder()
                        .idRol(persona.getIdRol())
                        .idPersona(persona.getIdPersona())
                        .build())
                .build();
    }

    public Persona toEntity() {
        return Persona.builder()
                .idRol(id.getIdRol())
                .idPersona(id.getIdPersona())
                .build();
    }
}
