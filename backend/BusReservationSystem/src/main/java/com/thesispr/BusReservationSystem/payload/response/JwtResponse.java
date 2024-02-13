package com.thesispr.BusReservationSystem.payload.response;

import java.util.List;

/**
 * Represents a JWT response containing authentication information.
 */
public class JwtResponse {
    /** The access token provided in the response. */
    private String token;

    /** The type of token, usually "Bearer". */
    private String type = "Bearer";

    /** The ID of the user associated with the token. */
    private Long id;

    /** The username of the user associated with the token. */
    private String username;

    /** The email address of the user associated with the token. */
    private String email;

    /** The roles assigned to the user associated with the token. */
    private List<String> roles;

    /**
     * Constructs a new JwtResponse with the provided access token, user ID, username, email, and roles.
     * @param accessToken The access token provided in the response.
     * @param id The ID of the user associated with the token.
     * @param username The username of the user associated with the token.
     * @param email The email address of the user associated with the token.
     * @param roles The roles assigned to the user associated with the token.
     */
    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    /**
     * Retrieves the access token from the response.
     * @return The access token provided in the response.
     */
    public String getAccessToken() {
        return token;
    }

    /**
     * Sets the access token for the response.
     * @param accessToken The access token to set.
     */
    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    /**
     * Retrieves the token type from the response.
     * @return The type of token, usually "Bearer".
     */
    public String getTokenType() {
        return type;
    }

    /**
     * Sets the token type for the response.
     * @param tokenType The token type to set.
     */
    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    /**
     * Retrieves the ID of the user associated with the token.
     * @return The ID of the user associated with the token.
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the ID of the user associated with the token.
     * @param id The ID of the user to set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the email address of the user associated with the token.
     * @return The email address of the user associated with the token.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address of the user associated with the token.
     * @param email The email address to set.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retrieves the username of the user associated with the token.
     * @return The username of the user associated with the token.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user associated with the token.
     * @param username The username to set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the roles assigned to the user associated with the token.
     * @return The roles assigned to the user associated with the token.
     */
    public List<String> getRoles() {
        return roles;
    }
}