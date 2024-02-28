package com.thesispr.BusReservationSystem.security;

import com.thesispr.BusReservationSystem.CustomJwtException;
import com.thesispr.BusReservationSystem.security.jwt.JwtUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JwtUtilsTest {

    @Mock
    private JwtUtils jwtUtils;

    @Test
    void testValidateJwtToken_NullToken() {
        // Given
        when(jwtUtils.validateJwtToken(null)).thenThrow(new IllegalArgumentException());

        // When/Then
        assertThrows(IllegalArgumentException.class, () -> jwtUtils.validateJwtToken(null));
    }

    @Test
    void testGetUserNameFromJwtToken() {
        // Given
        String token = "valid.jwt.token";
        String username = "testUser";
        when(jwtUtils.getUserNameFromJwtToken(token)).thenReturn(username);

        // When
        String extractedUsername = jwtUtils.getUserNameFromJwtToken(token);

        // Then
        assertEquals(username, extractedUsername);
    }

    @Test
    void testValidateJwtToken_ValidToken() {
        // Given
        String validToken = "valid.jwt.token";

        when(jwtUtils.validateJwtToken(validToken)).thenReturn(true);

        // When/Then
        assertTrue(jwtUtils.validateJwtToken(validToken));
    }


    @Test
    void testValidateJwtToken_InvalidToken() {
        // Given
        String invalidToken = "invalid.jwt.token";
        when(jwtUtils.validateJwtToken(invalidToken)).thenThrow(new CustomJwtException("Invalid JWT token"));

        // When/Then
        assertThrows(CustomJwtException.class, () -> jwtUtils.validateJwtToken(invalidToken));
    }
}
