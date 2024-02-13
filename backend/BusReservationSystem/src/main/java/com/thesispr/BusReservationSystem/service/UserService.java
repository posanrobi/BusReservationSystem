package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.UpdatePasswordRequest;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class responsible for providing operations related to users.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructs a new instance of UserService.
     *
     * @param userRepository The repository for users.
     * @param passwordEncoder The password encoder.
     */
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Retrieves all users.
     *
     * @return A list of User objects representing all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param userId The ID of the user to retrieve.
     * @return The User object corresponding to the given ID, or null if not found.
     */
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    /**
     * Saves a new user or updates an existing user.
     *
     * @param user The User object to save or update.
     * @return The saved or updated User object.
     */
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Deletes a user by their ID.
     *
     * @param userId The ID of the user to delete.
     */
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    /**
     * Updates user information.
     *
     * @param userId The ID of the user to update.
     * @param updatedUserData The updated user data.
     */
    public void updateUser(Long userId, User updatedUserData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        if (!user.getUsername().equals(updatedUserData.getUsername()) &&
                userRepository.existsByUsername(updatedUserData.getUsername())) {
            throw new DuplicateKeyException("username is already taken");
        }

        if (!user.getEmail().equals(updatedUserData.getEmail()) &&
                userRepository.existsByEmail(updatedUserData.getEmail())) {
            throw new DuplicateKeyException("email is already taken");
        }

        user.setUsername(updatedUserData.getUsername());
        user.setFirstname(updatedUserData.getFirstname());
        user.setLastname(updatedUserData.getLastname());
        user.setEmail(updatedUserData.getEmail());

        if (updatedUserData.getPassword() != null && !updatedUserData.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUserData.getPassword()));
        }

        userRepository.save(user);
    }
    /**
     * Updates the password for a user.
     *
     * @param userId The ID of the user to update the password for.
     * @param updatePasswordRequest The request containing the new password information.
     */
    public void updatePassword(Long userId, UpdatePasswordRequest updatePasswordRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        if (!passwordEncoder.matches(updatePasswordRequest.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("current password is incorrect");
        }

        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getConfirmPassword())) {
            throw new IllegalArgumentException("passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);
    }
}

