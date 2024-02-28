package com.thesispr.BusReservationSystem.payload;

import com.thesispr.BusReservationSystem.payload.request.SignupRequest;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SignupRequestTest {

    @Test
    public void testGettersAndSetters() {

        SignupRequest signupRequest = new SignupRequest();

        String username = "testuser";
        String email = "test@example.com";
        String password = "testpassword";
        String firstname = "John";
        String lastname = "Doe";
        Set<String> role = new HashSet<>();
        role.add("ROLE_USER");

        signupRequest.setUsername(username);
        signupRequest.setEmail(email);
        signupRequest.setPassword(password);
        signupRequest.setFirstname(firstname);
        signupRequest.setLastname(lastname);
        signupRequest.setRole(role);

        assertEquals(username, signupRequest.getUsername());
        assertEquals(email, signupRequest.getEmail());
        assertEquals(password, signupRequest.getPassword());
        assertEquals(firstname, signupRequest.getFirstname());
        assertEquals(lastname, signupRequest.getLastname());
        assertEquals(role, signupRequest.getRole());
    }
}
