package com.escom.administradordonaciones.donacion.util.error;

public interface ErrorCode {
    String getName();

    String getDetail();

    default BusinessException toBusinessException() {
        return new BusinessException(this.getName());
    }
}
