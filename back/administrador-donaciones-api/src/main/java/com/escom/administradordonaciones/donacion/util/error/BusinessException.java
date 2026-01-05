package com.escom.administradordonaciones.donacion.util.error;

public class BusinessException extends RuntimeException {
    public BusinessException(String errorCode) {
        super(errorCode);
    }
}
