package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.Role;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the UserService class.
 */
public class UserServiceTest {

    /**
     * Mock instance of UserRepository used for testing.
     */
    @Mock
    private UserRepository userRepository;

    /**
     * The instance of UserService to be tested.
     */
    @InjectMocks
    private UserService userService;

    /**
     * Sets up the necessary dependencies for each test.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the getAllUsers method of UserService.
     */
    @Test
    void testGetAllUsers() {
        /* Arrange: Create mock user data */
        List<User> mockData = new ArrayList<>();
        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();
        User user = new User(username, email, password, firstname, lastname, roles);
        mockData.add(user);

        when(userRepository.findAll()).thenReturn(mockData);

        /* Act: Call the getAllUsers method */
        List<User> result = userService.getAllUsers();

        /* Assert: Verify that the returned list matches the mock data */
        assertEquals(mockData, result);
    }

    /**
     * Test to verify the getUserById method of UserService.
     */
    @Test
    void testGetUserById() {
        /* Arrange: Create mock user data */
        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();
        User user = new User(username, email, password, firstname, lastname, roles);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        /* Act: Call the getUserById method */
        User result = userService.getUserById(1L);

        /* Assert: Verify that the returned user matches the mock data */
        assertEquals(user, result);
    }
}
