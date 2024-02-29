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

/**
 * Unit tests for the WebSecurityConfig class.
 */
public class WebSecurityConfigTest {

    /**
     * Mock instance of AuthenticationConfiguration used for testing.
     */
    @Mock
    private AuthenticationConfiguration authConfig;

    /**
     * The instance of WebSecurityConfig to be tested.
     */
    @InjectMocks
    private WebSecurityConfig webSecurityConfig;

    /**
     * Sets up the necessary dependencies for each test.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the authenticationManager method of WebSecurityConfig.
     *
     * @throws Exception if an exception occurs
     */
    @Test
    void testAuthenticationManager() throws Exception {
        /* Arrange: Create a mock AuthenticationManager and set up behavior to return it when
         * getAuthenticationManager is called */
        AuthenticationManager authenticationManagerMock = mock(AuthenticationManager.class);
        when(authConfig.getAuthenticationManager()).thenReturn(authenticationManagerMock);

        /* Act: Call the authenticationManager method of WebSecurityConfig */
        AuthenticationManager authenticationManager = webSecurityConfig.authenticationManager(authConfig);

        /* Assert: Verify that the returned AuthenticationManager is equal to the mock created */
        assertEquals(authenticationManagerMock, authenticationManager);
    }

    /**
     * Test to verify the passwordEncoder method of WebSecurityConfig.
     */
    @Test
    void testPasswordEncoder() {
        /* Act: Call the passwordEncoder method of WebSecurityConfig */
        PasswordEncoder passwordEncoder = webSecurityConfig.passwordEncoder();

        /* Assert: Verify that the returned PasswordEncoder is not null */
        assertNotNull(passwordEncoder);
    }
}

