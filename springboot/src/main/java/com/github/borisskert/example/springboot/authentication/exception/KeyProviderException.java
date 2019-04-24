package com.github.borisskert.example.springboot.authentication.exception;

public class KeyProviderException extends RuntimeException {
    public KeyProviderException(String message) {
        super(message);
    }

    public KeyProviderException(Throwable cause) {
        super(cause);
    }
}
