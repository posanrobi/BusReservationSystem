package com.thesispr.BusReservationSystem.payload.request;

/**
 * Represents a login request payload containing the username and password.
 */
public class LoginRequest {

    /** The username provided in the login request. */
    private String username;

    /** The password provided in the login request. */
    private String password;

    /**
     * Retrieves the username from the login request.
     * @return The username provided in the login request.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username for the login request.
     * @param username The username to set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the password from the login request.
     * @return The password provided in the login request.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password for the login request.
     * @param password The password to set.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}