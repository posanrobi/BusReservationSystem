package com.thesispr.BusReservationSystem.payload;

import com.thesispr.BusReservationSystem.payload.request.SignupRequest;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the SignupRequest class.
 */
public class SignupRequestTest {

    /**
     * Test to verify the getters and setters of the SignupRequest class.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Create a SignupRequest object */
        SignupRequest signupRequest = new SignupRequest();

        /* Define test data */
        String username = "testuser";
        String email = "test@example.com";
        String password = "testpassword";
        String firstname = "John";
        String lastname = "Doe";
        Set<String> role = new HashSet<>();
        role.add("ROLE_USER");

        /* Act: Set properties using setter methods */
        signupRequest.setUsername(username);
        signupRequest.setEmail(email);
        signupRequest.setPassword(password);
        signupRequest.setFirstname(firstname);
        signupRequest.setLastname(lastname);
        signupRequest.setRole(role);

        /* Assert: Verify that getters return expected values */
        assertEquals(username, signupRequest.getUsername());
        assertEquals(email, signupRequest.getEmail());
        assertEquals(password, signupRequest.getPassword());
        assertEquals(firstname, signupRequest.getFirstname());
        assertEquals(lastname, signupRequest.getLastname());
        assertEquals(role, signupRequest.getRole());
    }
}
