insert into cgl04_estado_incidencia (id_estado, tx_nombre)
values (1, 'Por resolver');
insert into cgl04_estado_incidencia (id_estado, tx_nombre)
values (2, 'Resuelta');

insert into cgl03_tipo_incidencia (id_tipo, tx_nombre, st_activo)
values (1, 'Lenguaje altisonante', true);

insert into cgl03_tipo_incidencia (id_tipo, tx_nombre, st_activo)
values (2, 'Uso indebido del sistema', true);

insert into cgl01_estado_donacion (id_estado, tx_nombre)
values (1, 'Activo');

insert into cgl01_estado_donacion (id_estado, tx_nombre)
values (2, 'Terminado');

insert into cgl02_tipo_donacion (id_tipo, tx_nombre, st_activo)
values
(1, 'Basicos', true),
(2, 'Apoyo domestico', true),
(3, 'Educacion', true),
(4, 'Apoyo social', true),
(5, 'Emergencias', true);

