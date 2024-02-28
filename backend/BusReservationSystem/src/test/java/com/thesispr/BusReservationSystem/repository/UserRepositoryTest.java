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

@ExtendWith(MockitoExtension.class)
public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @Test
    void testFindByUsername() {
        // Given
        String username = "testUser";
        User expectedUser = new User(username, "test@example.com", "password", "John", "Doe", new HashSet<>());

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expectedUser));

        // When
        Optional<User> result = userRepository.findByUsername(username);

        // Then
        assertTrue(result.isPresent());
        assertEquals(expectedUser, result.get());
    }

    @Test
    void testFindByEmail() {
        // Given
        String email = "test@example.com";
        User expectedUser = new User("testUser", email, "password", "John", "Doe", new HashSet<>());

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(expectedUser));

        // When
        Optional<User> result = userRepository.findByEmail(email);

        // Then
        assertTrue(result.isPresent());
        assertEquals(expectedUser, result.get());
    }
}
