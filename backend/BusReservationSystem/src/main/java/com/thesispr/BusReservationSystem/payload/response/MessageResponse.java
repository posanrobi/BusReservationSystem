package com.thesispr.BusReservationSystem.payload.response;

/**
 * Represents a message response returned from the server.
 */
public class MessageResponse {
    /** The message content of the response. */
    private String message;

    /**
     * Constructs a new MessageResponse with the provided message content.
     * @param message The message content of the response.
     */
    public MessageResponse(String message) {
        this.message = message;
    }

    /**
     * Retrieves the message content of the response.
     * @return The message content of the response.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message content of the response.
     * @param message The message content to set.
     */
    public void setMessage(String message) {
        this.message = message;
    }
}