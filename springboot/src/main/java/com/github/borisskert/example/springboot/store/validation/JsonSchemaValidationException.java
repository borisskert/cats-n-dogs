package com.github.borisskert.example.springboot.store.validation;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
class JsonSchemaValidationException extends RuntimeException {
    JsonSchemaValidationException(Throwable cause) {
        super(cause);
    }
}
