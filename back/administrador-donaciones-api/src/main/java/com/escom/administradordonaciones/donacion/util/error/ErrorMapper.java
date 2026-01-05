package mx.ipn.controlescolar.util.error;

import jakarta.validation.ConstraintViolation;
import jakarta.ws.rs.container.ContainerRequestContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ErrorMapper {
    private ErrorMapper() {
        super();
    }

    /**
     * Convierte un ConstraintViolation a un ErrorDetailDTO
     *
     * @param ve  ConstraintViolation
     * @param <T> Tipo de la clase que contiene el error
     * @return ErrorDetailDTO con el detalle del error
     */
    public static <T> ErrorDetailDTO constraintToError(ConstraintViolation<T> ve) {
        String msg = ErrorCodeEnum.CE_ERROR.getDetail();
        try {
            var temp = ErrorCodeEnum.valueOf(ve.getMessage());
            msg = temp.getDetail();
        } catch (IllegalArgumentException e) {
            log.error("Enum del error no encontrado", e);
        }
        return ErrorDetailDTO.builder()
                .code(ve.getMessage())
                .message(msg)
                .path(ve.getPropertyPath().toString()).build();
    }

    /**
     * Convierte un error code a un ErrorDetailDTO
     *
     * @param code Código del error
     * @return ErrorDetailDTO con el detalle del error
     */
    public static ErrorDetailDTO buildErrorDetail(String code) {
        String msg = ErrorCodeEnum.CE_ERROR.getDetail();
        try {
            var temp = ErrorCodeEnum.valueOf(code);
            msg = temp.getDetail();
        } catch (IllegalArgumentException e) {
            log.error("Error enum not found", e);
        }
        return ErrorDetailDTO.builder()
                .code(code)
                .message(msg)
                .build();
    }

    public static void getExtraRequestInfo(ContainerRequestContext containerRequestContext) {
        var uriInfo = containerRequestContext.getUriInfo();
        var path = uriInfo.getPath();
        var method = containerRequestContext.getMethod();
        var pathParams = uriInfo.getPathParameters();
        var queryParams = uriInfo.getQueryParameters();
        log.error("- [{}] {} PATH_PARAMS: {} QUERY_PARAMS: {} -", method, path, pathParams, queryParams);
    }
}
