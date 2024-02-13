package com.thesispr.BusReservationSystem;

/**
 * Custom exception class for JWT-related errors.
 */
public class CustomJwtException extends RuntimeException {

    /**
     * Constructs a new CustomJwtException with the specified detail message.
     *
     * @param message the detail message.
     */
    public CustomJwtException(String message) {
        super(message);
    }
}
