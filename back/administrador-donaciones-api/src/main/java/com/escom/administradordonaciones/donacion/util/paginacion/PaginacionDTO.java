package com.escom.administradordonaciones.donacion.util.paginacion;



import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.jboss.resteasy.reactive.RestQuery;


@Getter
@NoArgsConstructor
@Schema(name = "Paginacion", description = "Clase DTO utilizada para recibir los datos de paginación por back. Used in many")
public class PaginacionDTO {
    @RestQuery
    @PositiveOrZero(message = "CDA_RNS002")
    @Schema(description = "Número de página", writeOnly = true)
    private Integer numeroPagina;
    @RestQuery
    @PositiveOrZero(message = "CDA_RNS002")
    @Max(value = 500, message = "CDA_RNS003")
    @Schema(description = "Cantidad de filas por página", writeOnly = true)
    private Integer cantidadFilas;

    public Paginacion toEntity(){
        return Paginacion.builder()
                .numeroPagina(numeroPagina)
                .cantidadFilas(cantidadFilas)
                .build();
    }
}
