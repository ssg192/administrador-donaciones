package com.escom.administradordonaciones.donacion.external.jpa.model;

import com.escom.administradordonaciones.donacion.core.entity.Persona;
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
@Table(name = "cr02_persona")
public class PersonaJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cr02_persona_seq")
    @SequenceGenerator(name = "cr02_persona_seq", sequenceName = "cr02_persona_id_persona_seq", allocationSize = 1)
     @Column(name = "id_persona")
    private Integer id;
    @Column(name = "tx_nombre")
    private String nombre;
    @Column(name = "tx_primer_apellido")
    private String primerApellido;
    @Column(name = "tx_segundo_apellido")
    private String segundoApellido;
    @Column(name = "tx_correo")
    private String correo;
    @Column(name = "password")
    private String password;

    public static PersonaJpa fromEntity(Persona persona) {
        return PersonaJpa.builder()
                .id(persona.getIdPersona())
                .nombre(persona.getNombre())
                .primerApellido(persona.getPrimerApellido())
                .segundoApellido(persona.getSegundoApellido())
                .correo(persona.getCorreo())
                .password(persona.getPassword())
                .build();
    }

    public Persona toEntity() {
        return Persona.builder()
                .idPersona(id)
                .nombre(nombre)
                .primerApellido(primerApellido)
                .segundoApellido(segundoApellido)
                .correo(correo)
                .password(password)
                .build();
    }
}
