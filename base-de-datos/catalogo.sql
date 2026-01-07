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
