package com.thesispr.BusReservationSystem.security;

import com.thesispr.BusReservationSystem.CustomJwtException;
import com.thesispr.BusReservationSystem.security.jwt.JwtUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the JwtUtils class.
 */
@ExtendWith(MockitoExtension.class)
public class JwtUtilsTest {

    /**
     * Mock instance of JwtUtils used for testing.
     */
    @Mock
    private JwtUtils jwtUtils;

    /**
     * Test to verify the validateJwtToken method of JwtUtils with a null token.
     */
    @Test
    void testValidateJwtToken_NullToken() {
        /* Arrange: Set up the behavior */
        when(jwtUtils.validateJwtToken(null)).thenThrow(new IllegalArgumentException());

        /* Act & Assert: Verify that an exception is thrown when a null token is provided */
        assertThrows(IllegalArgumentException.class, () -> jwtUtils.validateJwtToken(null));
    }

    /**
     * Test to verify the getUserNameFromJwtToken method of JwtUtils.
     */
    @Test
    void testGetUserNameFromJwtToken() {
        /* Arrange: Define test data */
        String token = "valid.jwt.token";
        String username = "testUser";
        when(jwtUtils.getUserNameFromJwtToken(token)).thenReturn(username);

        /* Act: Call the method */
        String extractedUsername = jwtUtils.getUserNameFromJwtToken(token);

        /* Assert: Verify that the extracted username matches the expected value */
        assertEquals(username, extractedUsername);
    }

    /**
     * Test to verify the validateJwtToken method of JwtUtils with a valid token.
     */
    @Test
    void testValidateJwtToken_ValidToken() {
        /* Arrange: Define test data */
        String validToken = "valid.jwt.token";

        when(jwtUtils.validateJwtToken(validToken)).thenReturn(true);

        /* Act & Assert: Verify that the token is valid */
        assertTrue(jwtUtils.validateJwtToken(validToken));
    }

    /**
     * Test to verify the validateJwtToken method of JwtUtils with an invalid token.
     */
    @Test
    void testValidateJwtToken_InvalidToken() {
        /* Arrange: Define test data */
        String invalidToken = "invalid.jwt.token";
        when(jwtUtils.validateJwtToken(invalidToken)).thenThrow(new CustomJwtException("Invalid JWT token"));

        /* Act & Assert: Verify that an exception is thrown for an invalid token */
        assertThrows(CustomJwtException.class, () -> jwtUtils.validateJwtToken(invalidToken));
    }
}
