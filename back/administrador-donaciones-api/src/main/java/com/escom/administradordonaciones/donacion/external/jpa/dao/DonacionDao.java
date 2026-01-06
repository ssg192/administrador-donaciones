package com.escom.administradordonaciones.donacion.external.jpa.dao;

import com.escom.administradordonaciones.donacion.core.business.output.DonacionRepository;
import com.escom.administradordonaciones.donacion.core.entity.Catalogo;
import com.escom.administradordonaciones.donacion.core.entity.Donacion;
import com.escom.administradordonaciones.donacion.core.entity.Incidencia;
import com.escom.administradordonaciones.donacion.core.entity.Persona;
import com.escom.administradordonaciones.donacion.external.jpa.model.DonacionJpa;
import com.escom.administradordonaciones.donacion.external.jpa.model.IncidenciaJpa;
import com.escom.administradordonaciones.donacion.external.jpa.model.PersonaJpa;
import com.escom.administradordonaciones.donacion.external.jpa.model.RolPersonaJpa;
import com.escom.administradordonaciones.donacion.external.jpa.repository.DonacionJpaRepository;
import com.escom.administradordonaciones.donacion.external.jpa.repository.IncidenciaJpaRepository;
import com.escom.administradordonaciones.donacion.external.jpa.repository.PersonaJpaRepository;
import com.escom.administradordonaciones.donacion.external.jpa.repository.RolPersonaJpaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@ApplicationScoped
public class DonacionDao implements DonacionRepository {

    private final EntityManager entityManagerReading;
    private final PersonaJpaRepository personaJpaRepository;
    private final RolPersonaJpaRepository rolPersonaJpaRepository;
    private final IncidenciaJpaRepository  incidenciaJpaRepository;
    private final DonacionJpaRepository donacionJpaRepository;

    @Inject
    public DonacionDao(EntityManager entityManagerReading, PersonaJpaRepository personaJpaRepository,
                       RolPersonaJpaRepository rolPersonaJpaRepository,IncidenciaJpaRepository incidenciaJpaRepository,
                       DonacionJpaRepository donacionJpaRepository) {
        this.entityManagerReading = entityManagerReading;
        this.personaJpaRepository = personaJpaRepository;
        this.rolPersonaJpaRepository = rolPersonaJpaRepository;
        this.incidenciaJpaRepository = incidenciaJpaRepository;
        this.donacionJpaRepository = donacionJpaRepository;
    }

    private static final  String QUERY_FIND_DONACIONES_BY_ID_PERSONA = """
            select cr01.id_donacion, cr01.tx_descripcion,cgl02.tx_nombre as tipo_donacion,
            cgl01.id_estado,cgl01.tx_nombre as estado from cr01_donaciones cr01
            join cgl02_tipo_donacion cgl02 on cgl02.id_tipo = cr01.fk_tipo_donacion
            join cgl01_estado_donacion cgl01 on cgl01.id_estado = cr01.fk_id_estado
            where cr01.fk_id_persona = :idPersona
            """;
    private static final String QUERY_FIND_ALL_DONACIONES = """
            select cr01.id_donacion, cr01.tx_descripcion,cgl02.tx_nombre as tipo_donacion,
            cgl01.id_estado,cgl01.tx_nombre as estado,cr01.latitud ,cr01.longitud,cr01.profundidad from cr01_donaciones cr01
            join cgl02_tipo_donacion cgl02 on cgl02.id_tipo = cr01.fk_tipo_donacion
            join cgl01_estado_donacion cgl01 on cgl01.id_estado = cr01.fk_id_estado
            where cgl01.id_estado != 2
            """;

    private static final String QUERY_FIND_ALL_INCIDENCIAS = """
            select cr05.id_incidencia,cgl03.tx_nombre as tipo_incidencia,cr05.tx_comentario,
            cgl04.id_estado,cgl04.tx_nombre from cr05_incidencia cr05
            join cgl04_estado_incidencia cgl04 on cgl04.id_estado = cr05.fk_id_estado
            join cgl03_tipo_incidencia cgl03 on cgl03.id_tipo = cr05.fk_id_tipo_incidencia
            """;

    private static final String QUERY_FIND_ALL_PERSONAL = """
            select cr02.id_persona,
            cr02.tx_nombre || ' ' || cr02.tx_primer_apellido || coalesce((' '||tx_segundo_apellido), ' ') as personal,
            cr02.tx_correo from cr02_persona cr02
            join cr04_persona_rol cr04 on cr04.fk_id_persona = cr02.id_persona\s
            where cr04.fk_id_rol != 2 
            """;

    private static final String QUERY_FIND_PERSONA_BY_ID = """
            select cr02.id_persona, cr02.tx_nombre, cr02.tx_primer_apellido,
            cr02.tx_segundo_apellido,cr02.tx_correo,cr02.password from cr02_persona cr02
            where cr02.id_persona = :idPersona
            """;
    private static final String QUERY_FIND_USER_BY_CORREO = """
            select cr02.id_persona,cr04.fk_id_rol,cr02.password from cr02_persona cr02
            join cr04_persona_rol cr04 on cr04.fk_id_persona = cr02.id_persona
            where cr02.tx_correo = :correoElectronico
            """;

    private static final String QUERY_FIND_EXIST_USER_BY_CORREO = """
            select exists(select 1 from cr02_persona cr02
            where cr02.tx_correo = :correoElectronico)
            """;
    private static final String QUERY_FIND_CATALOGO_TIPOS_DONACION = """
            select cgl02.id_tipo,cgl02.tx_nombre from cgl02_tipo_donacion cgl02
            """;
    private static final String QUERY_FIND_CATALOGO_TIPO_INCIDENCIA = """
            select cgl03.id_tipo,cgl03.tx_nombre from cgl03_tipo_incidencia cgl03
            """;

    private static final String QUERY_FIND_DONACION_BY_ID = """
            select cr01.fk_tipo_donacion, cr01.latitud, cr01.longitud, 
            cr01.profundidad,cr01.tx_descripcion,cr01.fk_id_estado,cr01.fk_id_persona,cr01.id_donacion
            from cr01_donaciones cr01
            where cr01.id_donacion = :idDonacion
            """;

    private static final String PARAM_ID_PERSONA = "idPersona";
    private static final String PARAM_CORREO = "correoElectronico";
    private static final String PARAM_ID_DONACION="idDonacion";

    @Override
    @SuppressWarnings("unchecked")
    public List<Donacion> findDonacionesByIdPersona(Integer idPersona) {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_DONACIONES_BY_ID_PERSONA)
                .setParameter(PARAM_ID_PERSONA,idPersona)
                .getResultStream();
        return result.map(row->Donacion.builder()
                .idDonacion((Integer)row[0])
                .descripcion((String) row[1])
                .tipoDonacion((String) row[2])
                .idEstado((Integer)row[3])
                .estado((String)row[4])
                .build()).toList();

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Donacion> findAllDonaciones() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_ALL_DONACIONES)
                .getResultStream();
        return result.map(row->Donacion.builder()
                .idDonacion((Integer)row[0])
                .descripcion((String) row[1])
                .tipoDonacion((String) row[2])
                .idEstado((Integer)row[3])
                .estado((String)row[4])
                .latitud((BigDecimal) row[5])
                .longitud((BigDecimal)row[6])
                .profundidad((BigDecimal)row[7])
                .build()).toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Incidencia> findAllIncidenciasInDonacion() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_ALL_INCIDENCIAS)
                .getResultStream();
        return result.map(row->Incidencia.builder()
                .idIncidencia((Integer)row[0])
                .tipoIncidencia((String) row[1])
                .problema((String) row[2])
                .idEstado((Integer)row[3])
                .estado((String)row[4])
                .build()).toList();

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Persona> findAllPersonasWithoutAdmin() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_ALL_PERSONAL)
                .getResultStream();
        return result.map(row->Persona.builder()
                .idPersona((Integer)row[0])
                .nombre((String) row[1])
                .correo((String) row[2])
                .build()).toList();
    }

    @Override
    public Persona save(Persona persona) {
        return personaJpaRepository.saveAndFlush(PersonaJpa.fromEntity(persona)).toEntity();
    }

    @Override
    public void saveRol(Persona persona) {
        rolPersonaJpaRepository.saveAndFlush(RolPersonaJpa.fromEntity(persona)).toEntity();
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<Persona> findPersonaById(Integer idPersona) {
        Stream<Object[]>result = entityManagerReading.createNativeQuery(QUERY_FIND_PERSONA_BY_ID)
                .setParameter(PARAM_ID_PERSONA,idPersona)
                .getResultStream();
        return result.findFirst().map(row->Persona.builder()
                .idPersona( (Integer)row[0])
                .nombre((String) row[1])
                .primerApellido((String) row[2])
                .segundoApellido((String) row[3])
                .correo((String) row[4])
                .password((String) row[5])
                .build());
    }

    @Override
    public void delete(Integer idPersona) {
        personaJpaRepository.deleteById(idPersona);
    }

    @Override
    public void deleteRol(Integer idPersona) {
        rolPersonaJpaRepository.deleteById_idPersona(idPersona);
    }

    @Override
    public void saveIncidencia(Incidencia incidencia) {
        incidenciaJpaRepository.saveAndFlush(IncidenciaJpa.fromEntity(incidencia)).toEntity();
    }

    @Override
    public void updateIncidenciaEstado(Integer idIncidencia) {
        incidenciaJpaRepository.updateIncidenciaInEstadoResueltaById(idIncidencia);
    }

    @Override
    public boolean existUserByCorreoElectronico(String correoElectronico) {
        return (boolean) entityManagerReading.createNativeQuery(QUERY_FIND_EXIST_USER_BY_CORREO)
                .getSingleResult();
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<Persona> findInformacionUserByCorreo(String correoElectronico) {
        Stream<Object[]>result = entityManagerReading.createNativeQuery(QUERY_FIND_USER_BY_CORREO)
                .setParameter(PARAM_CORREO,correoElectronico)
                .getResultStream();
        return result.findFirst().map(row->Persona.builder()
                .idPersona((Integer)row[0])
                .idRol((Integer)row[1])
                .password((String) row[2])
                .build());
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Catalogo> findTiposDonacion() {
        Stream<Object[]>result = entityManagerReading.createNativeQuery(QUERY_FIND_CATALOGO_TIPOS_DONACION)
                .getResultStream();
        return result.map(row->Catalogo.builder()
                .id((Integer)row[0])
                .nombre((String) row[1])
                .build()).toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Catalogo> findTipoIncidencia() {
        Stream<Object[]>result = entityManagerReading.createNativeQuery(QUERY_FIND_CATALOGO_TIPO_INCIDENCIA)
                .getResultStream();
        return result.map(row->Catalogo.builder()
                .id((Integer)row[0])
                .nombre((String) row[1])
                .build()).toList();
    }

    @Override
    public void saveDonacion(Donacion donacion) {
        donacionJpaRepository.saveAndFlush(DonacionJpa.fromEntity(donacion)).toEntity();
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<Donacion> findByIdDonacion(Integer idDonacion) {
        Stream<Object[]>result = entityManagerReading.createNativeQuery(QUERY_FIND_DONACION_BY_ID)
                .setParameter(PARAM_ID_DONACION,idDonacion)
                .getResultStream();
        return result.findFirst().map(row->Donacion.builder()
                .idTipoDonacion((Integer)row[0])
                .latitud((BigDecimal)row[1])
                .longitud((BigDecimal)row[2])
                .profundidad((BigDecimal)row[3])
                .descripcion((String)row[4])
                .idEstado((Integer)row[5])
                .idPersona((Integer)row[6])
                .idDonacion((Integer)row[7])
                .build());
    }

    @Override
    public void deleteDonacion(Integer idDonacion) {
        donacionJpaRepository.deleteById(idDonacion);
    }

}
