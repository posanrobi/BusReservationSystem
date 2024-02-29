package com.thesispr.BusReservationSystem.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thesispr.BusReservationSystem.security.jwt.AuthEntryPointJwt;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.AuthenticationException;

import java.io.IOException;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the AuthEntryPointJwt class.
 */
public class AuthEntryPointJwtTest {

    /**
     * Test to verify the commence method of AuthEntryPointJwt.
     *
     * @throws IOException if an I/O exception occurs
     */
    @Test
    void testCommence() throws IOException {
        /* Arrange: Mock the AuthenticationException */
        AuthenticationException authException = mock(AuthenticationException.class);
        when(authException.getMessage()).thenReturn("Unauthorized");

        /* Create an instance of AuthEntryPointJwt */
        AuthEntryPointJwt authEntryPointJwt = new AuthEntryPointJwt();

        /* Create mock servlet request and response objects */
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        /* Act: Call the commence method */
        authEntryPointJwt.commence(request, response, authException);

        /* Assert: Verify the response status and content */
        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseBody = objectMapper.readValue(response.getContentAsString(), Map.class);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, responseBody.get("status"));
        assertEquals("Unauthorized", responseBody.get("error"));
        assertEquals("Unauthorized", responseBody.get("message"));
        assertEquals(request.getServletPath(), responseBody.get("path"));
    }
}
