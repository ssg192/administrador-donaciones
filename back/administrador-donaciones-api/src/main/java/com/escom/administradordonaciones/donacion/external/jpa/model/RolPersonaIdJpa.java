package com.escom.administradordonaciones.donacion.external.jpa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class RolPersonaIdJpa implements Serializable {
    @Column(name = "fk_id_persona", nullable = false)
    private Integer idPersona;
    @Column(name = "fk_id_rol", nullable = false)
    private Integer idRol;
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        RolPersonaIdJpa that = (RolPersonaIdJpa) o;
        return Objects.equals(idPersona, that.getIdPersona()) && Objects.equals(idRol, that.getIdRol());
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPersona, idPersona);
    }
}
