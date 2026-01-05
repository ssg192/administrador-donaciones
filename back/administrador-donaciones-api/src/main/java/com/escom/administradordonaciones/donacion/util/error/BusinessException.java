package mx.ipn.controlescolar.util.error;

public class BusinessException extends RuntimeException {
    public BusinessException(String errorCode) {
        super(errorCode);
    }
}
