package com.thesispr.BusReservationSystem.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Optional;

import com.thesispr.BusReservationSystem.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.repository.UserRepository;

/**
 * Unit tests for the UserDetailsServiceImpl class.
 */
class UserDetailsServiceImplTest {

    /**
     * The userDetailsService object used for testing UserDetailsServiceImpl.
     */
    private UserDetailsServiceImpl userDetailsService;

    /**
     * The userRepository mock object used for testing UserDetailsServiceImpl.
     */
    private UserRepository userRepository;

    /**
     * Sets up the necessary dependencies for each test.
     */
    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        userDetailsService = new UserDetailsServiceImpl(userRepository);
    }

    /**
     * Test to verify the loadUserByUsername method when provided with an existing user.
     */
    @Test
    void testLoadUserByUsername_ExistingUser() {
        /* Arrange: Set up the test data and mock behavior of the UserRepository to return an existing user */
        User user = new User("testuser", "test@example.com", "password", "John", "Doe",  new HashSet<>());

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        /* Act: Call the loadUserByUsername method with the username of the existing user */
        UserDetails userDetails = userDetailsService.loadUserByUsername("testuser");

        /* Assert: Verify that the returned UserDetails object matches the expected user details */
        assertEquals(user.getUsername(), userDetails.getUsername());
    }

    /**
     * Test to verify the loadUserByUsername method when provided with a non-existing user.
     */
    @Test
    void testLoadUserByUsername_NonExistingUser() {
        /*  Arrange: Set up the UserRepository to return empty a non-existing user */
        when(userRepository.findByUsername("nonexistinguser")).thenReturn(Optional.empty());

        /* Act & Assert: Ensure that loading a non-existing user throws a UsernameNotFoundException */
        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("nonexistinguser");
        });
    }
}
