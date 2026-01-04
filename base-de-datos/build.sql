SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='administrador-donaciones';

DROP DATABASE IF EXISTS "administrador-donaciones";

CREATE DATABASE "administrador-donaciones";

\c administrador-donaciones
BEGIN;
CREATE EXTENSION unaccent;
\i create.sql
\i catalogo.sql
COMMIT;