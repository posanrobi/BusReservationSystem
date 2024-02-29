package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the UserRepository interface.
 */
@ExtendWith(MockitoExtension.class)
public class UserRepositoryTest {

    /** The mocked UserRepository object. */
    @Mock
    private UserRepository userRepository;

    /**
     * Test to verify the findByUsername method of UserRepository.
     */
    @Test
    void testFindByUsername() {
        /* Arrange: Define test data */
        String username = "testUser";
        User expectedUser = new User(username, "test@example.com", "password", "John", "Doe", new HashSet<>());

        /* Mock the behavior of UserRepository */
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expectedUser));

        /* Act: Call the findByUsername method */
        Optional<User> result = userRepository.findByUsername(username);

        /* Assert: Verify the result */
        assertTrue(result.isPresent());
        assertEquals(expectedUser, result.get());
    }

    /**
     * Test to verify the findByEmail method of UserRepository.
     */
    @Test
    void testFindByEmail() {
        /* Arrange: Define test data */
        String email = "test@example.com";
        User expectedUser = new User("testUser", email, "password", "John", "Doe", new HashSet<>());

        /* Mock the behavior of UserRepository */
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(expectedUser));

        /* Act: Call the findByEmail method */
        Optional<User> result = userRepository.findByEmail(email);

        /* Assert: Verify the result */
        assertTrue(result.isPresent());
        assertEquals(expectedUser, result.get());
    }
}
