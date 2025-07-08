package com.codewithjj.wasteless.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotValidUUIDException extends RuntimeException {
    public NotValidUUIDException(String message) {
        super(message);
    }
}
