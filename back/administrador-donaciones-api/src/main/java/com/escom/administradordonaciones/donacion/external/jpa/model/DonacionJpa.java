package com.escom.administradordonaciones.donacion.external.jpa.model;

import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "cr01_donaciones")
public class DonacionJpa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_donacion")
    private Integer idDonacion;

    @Column(name = "fk_tipo_donacion")
    private Integer idTipoDonacion;

    @Column(name = "fk_id_persona")
    private Integer idPersona;

    @Column(name = "fk_id_estado")
    private Integer idEstado;

    @Column(name = "tx_descripcion")
    private String descripcion;

    @Column(name = "latitud")
    private BigDecimal latitud;

    @Column(name = "longitud")
    private BigDecimal longitud;

    @Column(name = "profundidad")
    private BigDecimal profundidad;

    public static DonacionJpa fromEntity (Donacion donacion) {
        return DonacionJpa.builder()
                .idDonacion(donacion.getIdDonacion())
                .idPersona(donacion.getIdPersona())
                .idTipoDonacion(donacion.getIdTipoDonacion())
                .idEstado(donacion.getIdEstado())
                .descripcion(donacion.getDescripcion())
                .latitud(donacion.getLatitud())
                .longitud(donacion.getLongitud())
                .profundidad(donacion.getProfundidad())
                .build();
    }

    public Donacion toEntity() {
        return Donacion.builder()
                .idDonacion(idDonacion)
                .idPersona(idPersona)
                .idTipoDonacion(idTipoDonacion)
                .idEstado(idEstado)
                .descripcion(descripcion)
                .latitud(latitud)
                .longitud(longitud)
                .profundidad(profundidad)
                .build();
    }
}
