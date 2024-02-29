package com.thesispr.BusReservationSystem.payload;

import com.thesispr.BusReservationSystem.payload.response.JwtResponse;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the JwtResponse class.
 */
public class JwtResponseTest {

    /**
     * Test to verify the getters of the JwtResponse class.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Define test data */
        String accessToken = "sampleAccessToken";
        Long id = 1L;
        String username = "testuser";
        String email = "test@example.com";
        List<String> roles = Arrays.asList("ROLE_USER", "ROLE_ADMIN");

        /* Act: Create a JwtResponse object */
        JwtResponse jwtResponse = new JwtResponse(accessToken, id, username, email, roles);

        /* Assert: Verify that getters return expected values */
        assertEquals(accessToken, jwtResponse.getAccessToken());
        assertEquals("Bearer", jwtResponse.getTokenType());
        assertEquals(id, jwtResponse.getId());
        assertEquals(username, jwtResponse.getUsername());
        assertEquals(email, jwtResponse.getEmail());
        assertEquals(roles, jwtResponse.getRoles());
    }
}
