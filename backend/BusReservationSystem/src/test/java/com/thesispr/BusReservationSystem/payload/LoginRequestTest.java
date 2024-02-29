package com.thesispr.BusReservationSystem.payload;

import com.thesispr.BusReservationSystem.payload.request.LoginRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the LoginRequest class.
 */
public class LoginRequestTest {

    /**
     * Test to verify the getters and setters of the LoginRequest class.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Create a LoginRequest object */
        LoginRequest loginRequest = new LoginRequest();

        /* Define test data */
        String username = "testuser";
        String password = "testpassword";

        /* Act: Set properties using setter methods */
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        /* Assert: Verify that getters return expected values */
        assertEquals(username, loginRequest.getUsername());
        assertEquals(password, loginRequest.getPassword());
    }
}
