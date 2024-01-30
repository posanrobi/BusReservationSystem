package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.UpdatePasswordRequest;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    //@Autowired
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    /*public UserService() {
    }*/

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void updateUser(Long userId, User updatedUserData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        user.setUsername(updatedUserData.getUsername());
        user.setFirstname(updatedUserData.getFirstname());
        user.setLastname(updatedUserData.getLastname());
        user.setEmail(updatedUserData.getEmail());

        /*if (updatedUserData.getPassword() != null && !updatedUserData.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUserData.getPassword()));
        }*/

        if (updatedUserData.getPassword() != null && !updatedUserData.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUserData.getPassword()));
        }


        userRepository.save(user);
    }

    public void updatePassword(Long userId, UpdatePasswordRequest updatePasswordRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!passwordEncoder.matches(updatePasswordRequest.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirmation do not match");
        }

        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);
    }
}

