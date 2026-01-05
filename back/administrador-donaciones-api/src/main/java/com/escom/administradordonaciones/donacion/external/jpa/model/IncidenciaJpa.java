package com.escom.administradordonaciones.donacion.external.jpa.model;

import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "cr05_incidencia")
public class IncidenciaJpa {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cr05_incidencia_seq")
    @SequenceGenerator(name = "cr05_incidencia_seq", sequenceName = "cr05_incidencia_id_incidencia_seq", allocationSize = 1)
    @Column(name = "id_incidencia")
    private Integer id;
    @Column(name = "fk_id_tipo_incidencia")
    private Integer idTipoIncidencia;
    @Column(name = "tx_comentario")
    private String comentario;
    @Column(name = "fk_id_estado")
    private Integer idEstado;

    public static IncidenciaJpa fromEntity(Incidencia incidencia) {
        return IncidenciaJpa.builder()
                .id(incidencia.getIdIncidencia())
                .idTipoIncidencia(incidencia.getIdTipoIncidencia())
                .comentario(incidencia.getProblema())
                .idEstado(incidencia.getIdEstado())
                .build();
    }

    public Incidencia toEntity() {
        return Incidencia.builder()
                .idIncidencia(id)
                .idTipoIncidencia(idTipoIncidencia)
                .problema(comentario)
                .idEstado(idEstado)
                .build();
    }

}
