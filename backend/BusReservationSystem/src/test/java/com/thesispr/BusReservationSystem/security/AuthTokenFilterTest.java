package com.thesispr.BusReservationSystem.security;

import com.thesispr.BusReservationSystem.security.jwt.AuthTokenFilter;
import com.thesispr.BusReservationSystem.security.jwt.JwtUtils;
import com.thesispr.BusReservationSystem.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;

import static org.mockito.Mockito.*;

/**
 * Unit tests for the AuthTokenFilter class.
 */
@ExtendWith(MockitoExtension.class)
public class AuthTokenFilterTest {

    /**
     * Mock instance of JwtUtils used for simulating JWT token-related functionality.
     */
    @Mock
    private JwtUtils jwtUtils;

    /**
     * Mock instance of UserDetailsServiceImpl used for simulating user details service functionality.
     */
    @Mock
    private UserDetailsServiceImpl userDetailsService;

    /**
     * Injected mock instance of AuthTokenFilter for testing.
     */
    @InjectMocks
    private AuthTokenFilter authTokenFilter;

    /**
     * Test to verify the doFilterInternal method of AuthTokenFilter when provided with a valid token.
     *
     * @throws ServletException if a servlet exception occurs
     * @throws IOException      if an I/O exception occurs
     */
    @Test
    void testDoFilterInternal_ValidToken() throws ServletException, IOException {
        /* Arrange: Create mock objects and set up behavior */
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        String jwt = "valid.jwt.token";
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwt);
        when(jwtUtils.validateJwtToken(jwt)).thenReturn(true);

        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();
        when(jwtUtils.getUserNameFromJwtToken(jwt)).thenReturn("testUser");
        when(userDetailsService.loadUserByUsername("testUser")).thenReturn(userDetails);

        /* Act: Call the doFilterInternal method */
        authTokenFilter.doFilterInternal(request, response, filterChain);

        /* Assert: Verify method invocations */
        verify(jwtUtils).validateJwtToken(jwt);
        verify(jwtUtils).getUserNameFromJwtToken(jwt);
        verify(userDetailsService).loadUserByUsername("testUser");
        verify(filterChain).doFilter(request, response);
    }
}
