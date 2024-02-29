package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.UpdatePasswordRequest;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the UserController class.
 */
public class UserControllerTest {
    /**
     * The controller under test.
     */
    @InjectMocks
    private UserController userController;

    /**
     * Mocked user service.
     */
    @Mock
    private UserService userService;

    /**
     * Setup method to initialize mocks.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the retrieval of all users.
     */
    @Test
    public void testGetAllUsers() {
        /* Arrange: Create mock users and configure mock behavior */
        List<User> mockUsers = new ArrayList<>();
        mockUsers.add(new User());
        mockUsers.add(new User());

        when(userService.getAllUsers()).thenReturn(mockUsers);

        /* Act: Call the method under test */
        ResponseEntity<List<User>> responseEntity = userController.getAllUsers();

        /* Assert: Verify the response status and body */
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockUsers, responseEntity.getBody());
    }

    /**
     * Test to verify the retrieval of a user by ID when the user exists.
     */
    @Test
    public void testGetUserById_UserExists() {
        /* Arrange: Set up user ID and mock user */
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        /* Mock the behavior of the user service */
        when(userService.getUserById(userId)).thenReturn(user);

        /* Act: Call the method under test */
        ResponseEntity<User> responseEntity = userController.getUserById(userId);

        /* Assert: Verify the response status and body */
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(user, responseEntity.getBody());
    }

    /**
     * Test to verify the retrieval of a user by ID when the user does not exist.
     */
    @Test
    public void testGetUserById_UserNotFound() {
        /* Arrange: Set up user ID and mock behavior */
        Long userId = 1L;

        /* Mock the behavior of the user service to return null */
        when(userService.getUserById(userId)).thenReturn(null);

        /* Act: Call the method under test */
        ResponseEntity<User> responseEntity = userController.getUserById(userId);

        /* Assert: Verify the response status and body */
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }

    /**
     * Test to verify the creation of a user.
     */
    @Test
    public void testCreateUser() {
        /* Arrange: Create a sample user and configure mock behavior */
        User user = new User();
        user.setId(1L);

        when(userService.saveUser(any(User.class))).thenReturn(user);

        /* Act: Call the method under test */
        ResponseEntity<User> responseEntity = userController.createUser(user);

        /* Assert: Verify the response status and body */
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(user, responseEntity.getBody());
    }

    /**
     * Test to verify the deletion of a user.
     */
    @Test
    public void testDeleteUser() {
        /* Arrange: Set up user ID */
        Long userId = 1L;

        /* Act: Call the method under test */
        ResponseEntity<Void> responseEntity = userController.deleteUser(userId);

        /* Assert: Verify the response status */
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }

    /**
     * Test to verify successful password update for a user.
     */
    @Test
    public void testUpdatePasswordSuccess() {
        /* Arrange: Set up user ID and update password request */
        Long userId = 1L;
        UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();

        /* Act: Call the method under test */
        ResponseEntity<?> responseEntity = userController.updatePassword(userId, updatePasswordRequest);

        /* Assert: Verify the response status */
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
}
