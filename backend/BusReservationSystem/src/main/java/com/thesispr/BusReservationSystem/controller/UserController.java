package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.UpdatePasswordRequest;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class responsible for handling HTTP requests related to users.
 * Provides endpoints for managing user data, including retrieval, creation, updating, and deletion of users.
 * Endpoints are prefixed with "/api/users".
 * Cross-origin requests are allowed from all origins with a maximum age of 3600 seconds (1 hour).
 * @RestController Indicates that this class is a controller and that the return value of its methods should be written directly to the HTTP response body.
 * @CrossOrigin Annotation for enabling cross-origin requests on specific handler methods or controller classes.
 * @RequestMapping Specifies the base URL path for all endpoints in this controller.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    /**
     * Constructor injection of UserService dependency.
     * @param userService An instance of UserService used for handling user-related operations.
     */
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Handles HTTP GET requests to retrieve all users.
     * Retrieves a list of all users and returns it.
     * Requires the requester to have the 'ROLE_ADMIN' authority.
     * @return A ResponseEntity containing a list of User objects representing all users and an HTTP status code of 200 (OK).
     */
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Handles HTTP GET requests to retrieve a user by ID.
     * Retrieves the user with the specified ID and returns it.
     * @param userId The ID of the user to be retrieved.
     * @return A ResponseEntity containing the User object representing the requested user and an HTTP status code of 200 (OK) if found,
     *         or an HTTP status code of 404 (Not Found) if the user is not found.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    /**
     * Handles HTTP POST requests to create a new user.
     * Creates a new user using the provided user data and returns the created user.
     * @param user The user object containing data for the new user.
     * @return A ResponseEntity containing the created User object and an HTTP status code of 201 (Created).
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    /**
     * Handles HTTP PUT requests to update an existing user.
     * Updates the user with the specified ID using the provided user data and returns the updated user.
     * @param userId The ID of the user to be updated.
     * @param user The user object containing updated data for the user.
     * @return A ResponseEntity containing the updated User object and an HTTP status code of 200 (OK) if the update is successful,
     *         or an appropriate HTTP status code indicating the reason for failure.
     */
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User user) {
        user.setId(userId);
        try {
            userService.updateUser(userId, user);
            return ResponseEntity.ok(user);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * Handles HTTP DELETE requests to delete a user by ID.
     * Deletes the user with the specified ID and returns an appropriate response.
     * @param userId The ID of the user to be deleted.
     * @return A ResponseEntity with an HTTP status code of 204 (No Content) indicating successful deletion.
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Handles HTTP PUT requests to update a user's password.
     * Updates the password of the user with the specified ID using the provided password data.
     * @param userId The ID of the user whose password is to be updated.
     * @param updatePasswordRequest An object containing the new password data.
     * @return A ResponseEntity containing a message indicating the result of the password update operation and an appropriate HTTP status code.
     */
    @PutMapping("/{userId}/update-password")
    public ResponseEntity<?> updatePassword(
            @PathVariable Long userId,
            @RequestBody UpdatePasswordRequest updatePasswordRequest) {

        try {
            userService.updatePassword(userId, updatePasswordRequest);
            return ResponseEntity.ok("Password updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update password");
        }
    }

}
