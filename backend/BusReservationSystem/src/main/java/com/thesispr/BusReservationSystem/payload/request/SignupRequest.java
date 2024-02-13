package com.thesispr.BusReservationSystem.payload.request;

import java.util.Set;

/**
 * Represents a signup request payload containing user registration information.
 */
public class SignupRequest {

    /** The username for the user's account. */
    private String username;

    /** The email address for the user's account. */
    private String email;

    /** The password for the user's account. */
    private String password;

    /** The first name of the user. */
    private String firstname;

    /** The last name of the user. */
    private String lastname;

    /** The roles assigned to the user. */
    private Set<String> role;

    /**
     * Retrieves the first name from the signup request.
     * @return The first name provided in the signup request.
     */
    public String getFirstname() {
        return firstname;
    }

    /**
     * Sets the first name for the signup request.
     * @param firstname The first name to set.
     */
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    /**
     * Retrieves the last name from the signup request.
     * @return The last name provided in the signup request.
     */
    public String getLastname() {
        return lastname;
    }

    /**
     * Sets the last name for the signup request.
     * @param lastname The last name to set.
     */
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    /**
     * Retrieves the username from the signup request.
     * @return The username provided in the signup request.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username for the signup request.
     * @param username The username to set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the email address from the signup request.
     * @return The email address provided in the signup request.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address for the signup request.
     * @param email The email address to set.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retrieves the password from the signup request.
     * @return The password provided in the signup request.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password for the signup request.
     * @param password The password to set.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Retrieves the roles assigned to the user from the signup request.
     * @return The roles assigned to the user.
     */
    public Set<String> getRole() {
        return this.role;
    }

    /**
     * Sets the roles assigned to the user for the signup request.
     * @param role The roles to set.
     */
    public void setRole(Set<String> role) {
        this.role = role;
    }
}