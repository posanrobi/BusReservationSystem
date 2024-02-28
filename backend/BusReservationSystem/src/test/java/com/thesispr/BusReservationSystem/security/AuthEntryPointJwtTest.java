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

public class AuthEntryPointJwtTest {

    @Test
    void testCommence() throws IOException {
        // Given
        AuthenticationException authException = mock(AuthenticationException.class);
        when(authException.getMessage()).thenReturn("Unauthorized");
        AuthEntryPointJwt authEntryPointJwt = new AuthEntryPointJwt();
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        // When
        authEntryPointJwt.commence(request, response, authException);

        // Then
        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseBody = objectMapper.readValue(response.getContentAsString(), Map.class);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, responseBody.get("status"));
        assertEquals("Unauthorized", responseBody.get("error"));
        assertEquals("Unauthorized", responseBody.get("message"));
        assertEquals(request.getServletPath(), responseBody.get("path"));
    }
}
