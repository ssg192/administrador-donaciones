CREATE SEQUENCE cr01_donaciones_id_donacion_seq START 1;
CREATE SEQUENCE cgl01_estado_donacion_id_estado_seq START 1;
CREATE SEQUENCE cgl02_tipo_donacion_id_tipo_seq START 1;
CREATE SEQUENCE cr02_persona_id_persona_seq START 1;
CREATE SEQUENCE cr03_rol_id_rol_seq START 1;
CREATE SEQUENCE cr05_incidencia_id_incidencia_seq START 1;
CREATE SEQUENCE cgl03_tipo_incidencia_id_tipo_seq START 1;
CREATE SEQUENCE cgl04_estado_incidencia_id_estado_seq START 1;

CREATE TABLE cgl01_estado_donacion (
    id_estado INTEGER NOT NULL
        DEFAULT nextval('cgl01_estado_donacion_id_estado_seq'),
    tx_nombre VARCHAR(255) NOT NULL,
    CONSTRAINT pk_cgl01_estado_donacion PRIMARY KEY (id_estado)
);

CREATE TABLE cgl02_tipo_donacion (
    id_tipo INTEGER NOT NULL
        DEFAULT nextval('cgl02_tipo_donacion_id_tipo_seq'),
    tx_nombre VARCHAR(255) NOT NULL,
    st_activo BOOLEAN NOT NULL,
    CONSTRAINT pk_cgl02_tipo_donacion PRIMARY KEY (id_tipo)
);

CREATE TABLE cgl03_tipo_incidencia (
    id_tipo INTEGER NOT NULL
        DEFAULT nextval('cgl03_tipo_incidencia_id_tipo_seq'),
    tx_nombre VARCHAR(255) NOT NULL,
    st_activo BOOLEAN NOT NULL,
    CONSTRAINT pk_cgl03_tipo_incidencia PRIMARY KEY (id_tipo)
);

CREATE TABLE cgl04_estado_incidencia (
    id_estado INTEGER NOT NULL
        DEFAULT nextval('cgl04_estado_incidencia_id_estado_seq'),
    tx_nombre VARCHAR(255) NOT NULL,
    CONSTRAINT pk_cgl04_estado_incidencia PRIMARY KEY (id_estado)
);

CREATE TABLE cr02_persona (
    id_persona INTEGER NOT NULL
        DEFAULT nextval('cr02_persona_id_persona_seq'),
    tx_nombre VARCHAR(255) NOT NULL,
    tx_primer_apellido VARCHAR(255) NOT NULL,
    tx_segundo_apellido VARCHAR(255) NOT NULL,
    tx_correo VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT pk_cr02_persona PRIMARY KEY (id_persona)
);

CREATE TABLE cr03_rol (
    id_rol INTEGER NOT NULL
        DEFAULT nextval('cr03_rol_id_rol_seq'),
    tx_nombre VARCHAR(255) NOT NULL,
    CONSTRAINT pk_cr03_rol PRIMARY KEY (id_rol)
);

CREATE TABLE cr04_persona_rol (
    fk_id_persona INTEGER NOT NULL,
    fk_id_rol INTEGER NOT NULL,
    CONSTRAINT pk_cr04_persona_rol
        PRIMARY KEY (fk_id_persona, fk_id_rol)
);

CREATE TABLE cr01_donaciones (
    id_donacion INTEGER NOT NULL
        DEFAULT nextval('cr01_donaciones_id_donacion_seq'),
    fk_tipo_donacion INTEGER NOT NULL,
    fk_id_persona INTEGER NOT NULL,
    fk_id_estado INTEGER NOT NULL,
    tx_descripcion VARCHAR(50000) NOT NULL,
    latitud DECIMAL(10,7) NOT NULL,
    longitud DECIMAL(10,7) NOT NULL,
    profundidad DECIMAL(10,2) NOT NULL,
    CONSTRAINT pk_cr01_donaciones PRIMARY KEY (id_donacion)
);

CREATE TABLE cr05_incidencia (
    id_incidencia INTEGER NOT NULL
        DEFAULT nextval('cr05_incidencia_id_incidencia_seq'),
    fk_id_tipo_incidencia INTEGER NOT NULL,
    tx_comentario VARCHAR(50000) NOT NULL,
    fk_id_estado INTEGER NOT NULL,
    CONSTRAINT pk_cr05_incidencia PRIMARY KEY (id_incidencia)
);


ALTER TABLE cr01_donaciones
ADD CONSTRAINT fk_cr01_donaciones_tipo
FOREIGN KEY (fk_tipo_donacion) REFERENCES cgl02_tipo_donacion(id_tipo);

ALTER TABLE cr01_donaciones
ADD CONSTRAINT fk_cr01_donaciones_persona
FOREIGN KEY (fk_id_persona) REFERENCES cr02_persona(id_persona);

ALTER TABLE cr01_donaciones
ADD CONSTRAINT fk_cr01_donaciones_estado
FOREIGN KEY (fk_id_estado) REFERENCES cgl01_estado_donacion(id_estado);

ALTER TABLE cr04_persona_rol
ADD CONSTRAINT fk_cr04_persona_rol_persona
FOREIGN KEY (fk_id_persona) REFERENCES cr02_persona(id_persona);

ALTER TABLE cr04_persona_rol
ADD CONSTRAINT fk_cr04_persona_rol_rol
FOREIGN KEY (fk_id_rol) REFERENCES cr03_rol(id_rol);

ALTER TABLE cr05_incidencia
ADD CONSTRAINT fk_cr05_incidencia_tipo
FOREIGN KEY (fk_id_tipo_incidencia) REFERENCES cgl03_tipo_incidencia(id_tipo);

ALTER TABLE cr05_incidencia
ADD CONSTRAINT fk_cr05_incidencia_estado
FOREIGN KEY (fk_id_estado) REFERENCES cgl04_estado_incidencia(id_estado);

ALTER SEQUENCE cr01_donaciones_id_donacion_seq OWNED BY cr01_donaciones.id_donacion;
ALTER SEQUENCE cgl01_estado_donacion_id_estado_seq OWNED BY cgl01_estado_donacion.id_estado;
ALTER SEQUENCE cgl02_tipo_donacion_id_tipo_seq OWNED BY cgl02_tipo_donacion.id_tipo;
ALTER SEQUENCE cr02_persona_id_persona_seq OWNED BY cr02_persona.id_persona;
ALTER SEQUENCE cr03_rol_id_rol_seq OWNED BY cr03_rol.id_rol;
ALTER SEQUENCE cr05_incidencia_id_incidencia_seq OWNED BY cr05_incidencia.id_incidencia;
ALTER SEQUENCE cgl03_tipo_incidencia_id_tipo_seq OWNED BY cgl03_tipo_incidencia.id_tipo;
ALTER SEQUENCE cgl04_estado_incidencia_id_estado_seq OWNED BY cgl04_estado_incidencia.id_estado;

CREATE INDEX idx_cr01_donaciones_fk_persona ON cr01_donaciones (fk_id_persona);
CREATE INDEX idx_cr01_donaciones_fk_tipo ON cr01_donaciones (fk_tipo_donacion);
CREATE INDEX idx_cr01_donaciones_fk_estado ON cr01_donaciones (fk_id_estado);
CREATE INDEX idx_cr04_persona_rol_persona ON cr04_persona_rol (fk_id_persona);
CREATE INDEX idx_cr04_persona_rol_rol ON cr04_persona_rol (fk_id_rol);
CREATE INDEX idx_cr05_incidencia_fk_estado ON cr05_incidencia (fk_id_estado);
CREATE INDEX idx_cr05_incidencia_fk_tipo ON cr05_incidencia (fk_id_tipo_incidencia);


insert into cgl04_estado_incidencia (id_estado, tx_nombre)
values (1, 'Por resolver');
insert into cgl04_estado_incidencia (id_estado, tx_nombre)
values (2, 'Resuelta');

insert into cgl03_tipo_incidencia (id_tipo, tx_nombre, st_activo) values
(1, 'Lenguaje altisonante', true),
(2, 'Uso indebido del sistema', true),
(3, 'Información de punto de apoyo incorrecta', true),
(4, 'Falta de actualización de necesidades', true),
(5, 'Donación incompleta o errónea', true),
(6, 'Retraso en la entrega de donaciones', true),
(7, 'Beneficiario no localizado', true),
(8, 'Conflicto entre donante y beneficiario', true),
(9, 'Datos de contacto inválidos', true),
(10, 'Mal uso de los recursos del punto de apoyo', true),
(11, 'Duplicidad de donaciones registradas', true),
(12, 'Entrega de donación en punto equivocado', true),
(13, 'Falta de seguimiento a beneficiarios', true),
(14, 'Falta de registro de donante', true),
(15, 'Incumplimiento de horarios de atención', true),
(16, 'Falta de documentación de donación', true),
(17, 'Reporte de daño o pérdida de donación', true),
(18, 'Error en asignación de punto de apoyo', true),
(19, 'Problema de acceso al sistema', true),
(20, 'Incidencia general no categorizada', true);

insert into cgl01_estado_donacion (id_estado, tx_nombre)
values (1, 'Activo');

insert into cgl01_estado_donacion (id_estado, tx_nombre)
values (2, 'Inactivo');

insert into cgl02_tipo_donacion (id_tipo, tx_nombre, st_activo)
values
(1, 'Basicos', true),
(2, 'Apoyo domestico', true),
(3, 'Educacion', true),
(4, 'Apoyo social', true),
(5, 'Emergencias', true);

INSERT INTO cr03_rol
(id_rol,tx_nombre)
VALUES(1,'Administrador'),
(2,'Necesitador');

insert into cr02_persona (id_persona, tx_nombre, tx_primer_apellido, tx_segundo_apellido, tx_correo, password)
values (1, 'Admin', 'Sistema', 'Principal', 'admin@gmail.com', '$2a$12$R6cndsS4sctY83hymogQ7uy1LGxyIH2wXxBS.YYDwWeSNu.rVd4uO');

insert into cr04_persona_rol (fk_id_persona, fk_id_rol)
values (1, 1);
