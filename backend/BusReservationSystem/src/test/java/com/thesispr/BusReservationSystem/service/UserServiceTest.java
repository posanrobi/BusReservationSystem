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

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
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

        List<User> result = userService.getAllUsers();

        assertEquals(mockData, result);
    }

    @Test
    void testGetUserById() {
        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();

        User user = new User(username, email, password, firstname, lastname, roles);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertEquals(user, result);
    }
}
