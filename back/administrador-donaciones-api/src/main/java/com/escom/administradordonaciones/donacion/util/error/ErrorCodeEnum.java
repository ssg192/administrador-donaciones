package mx.ipn.controlescolar.util.error;

public enum ErrorCodeEnum implements ErrorCode {
    // GENERAL
    CE_NOT_FOUND("No se encontró el recurso"),
    CE_ERROR("Error inesperado"),

    // SISTEMA (CE-RS-SXXX)
    CE_RNS001("Campos obligatorios"),
    CE_RNS002("Máquina de estados"),
    CE_RNS003("Elementos registrados en el sistema"),

    // NEGOCIO (CE-RN-NXXX)
    CE_RNN001("Unicidad de elementos"),
    CE_RNN002("Elementos mínimos necesarios"),
    CE_RNN003("Realizar acción en una entidad asociada a otras"),
    CE_RNN004("Listado de boletas válido"),
    CE_RNN005("Conteo de sustentantes en universo"),
    CE_RNN006("Actualización automática en bloque"),
    CE_RNN007("Avisos de situación"),
    CE_RNN008("Identificador de periodo"),
    CE_RNN009("Separador de listado de boletas válido"),
    CE_RNN010("Etiquetas de bloque"),
    CE_RNN011("Actualización automática en bloque"),
    CE_RNN012("Conteo de candidatos en bloque"),
    CE_RNN017("Fecha Inicio anterior o igual a la fecha fin"),
    CE_RNN018("Traslape de candidato por universo"),
    CE_RNN021("Relación de valores incorrecta en fechas"),
    CE_RNN026("Validación de horario en una misma fecha"),
    CE_RNN028("Relación de semestres correcta"),
    CE_RNN029("Relación de fechas con respecto a la actual"),
    CE_RNN030("Fecha de inicio para consultar horario y turno"),
    CE_RNN031("Fecha de inicio para consultar horarios y cupos"),
    CE_RNN032("Relación de fecha de inscripciones"),
    CE_RNN033("Relación de fecha de reinscripciones"),
    CE_RNN034("Validación de horario en una misma fecha de inscripciones"),
    CE_RNN035("Validación de horario en una misma fecha de reinscripciones"),
    CE_RNN054("Clave de autorización válido");
    private final String detail;

    ErrorCodeEnum(String detail) {
        this.detail = detail;
    }

    @Override
    public String getName() {
        return this.toString();
    }

    @Override
    public String getDetail() {
        return this.detail;
    }
}
