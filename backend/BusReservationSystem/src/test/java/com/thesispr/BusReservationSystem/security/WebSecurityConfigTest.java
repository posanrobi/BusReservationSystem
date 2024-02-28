package com.thesispr.BusReservationSystem.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class WebSecurityConfigTest {

    @Mock
    private AuthenticationConfiguration authConfig;

    @InjectMocks
    private WebSecurityConfig webSecurityConfig;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAuthenticationManager() throws Exception {
        AuthenticationManager authenticationManagerMock = mock(AuthenticationManager.class);
        when(authConfig.getAuthenticationManager()).thenReturn(authenticationManagerMock);

        AuthenticationManager authenticationManager = webSecurityConfig.authenticationManager(authConfig);

        assertEquals(authenticationManagerMock, authenticationManager);
    }

    @Test
    void testPasswordEncoder() {
        PasswordEncoder passwordEncoder = webSecurityConfig.passwordEncoder();

        assertNotNull(passwordEncoder);
    }
}

