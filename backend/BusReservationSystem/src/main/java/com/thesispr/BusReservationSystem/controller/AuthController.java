package com.thesispr.BusReservationSystem.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.thesispr.BusReservationSystem.model.Role;
import com.thesispr.BusReservationSystem.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.payload.request.LoginRequest;
import com.thesispr.BusReservationSystem.payload.request.SignupRequest;
import com.thesispr.BusReservationSystem.payload.response.JwtResponse;
import com.thesispr.BusReservationSystem.payload.response.MessageResponse;
import com.thesispr.BusReservationSystem.repository.UserRepository;
import com.thesispr.BusReservationSystem.security.jwt.JwtUtils;
import com.thesispr.BusReservationSystem.security.services.UserDetailsImpl;

/**
 * Controller class responsible for handling authentication-related HTTP requests.
 * This includes user authentication (sign-in) and user registration (sign-up).
 * Uses Spring Security for authentication and JWT (JSON Web Token) for authorization.
 * Endpoints are prefixed with "/api/auth".
 * Cross-origin requests are allowed from all origins with a maximum age of 3600 seconds (1 hour).
 * @RestController Indicates that this class is a controller and that the return value of its methods should be written directly to the HTTP response body.
 * @CrossOrigin Annotation for enabling cross-origin requests on specific handler methods or controller classes.
 * @RequestMapping Specifies the base URL path for all endpoints in this controller.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    /**
     * Handles user authentication (sign-in) requests.
     * Authenticates the user credentials using Spring Security's AuthenticationManager.
     * Generates a JWT token upon successful authentication.
     * @param loginRequest The request body containing the user's login credentials (username and password).
     * @return ResponseEntity containing a JWT response if authentication is successful, along with user details and roles.
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    /**
     * Handles user registration (sign-up) requests.
     * Registers a new user with the provided details.
     * Validates if the username and email are not already in use.
     * Sets user roles based on the provided role or defaults to ROLE_USER.
     * @param signUpRequest The request body containing user registration details (username, email, password, firstname, lastname, role).
     * @return ResponseEntity containing a message response indicating successful registration or error messages.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("email is already in use!"));
        }

        Set<Role> roles = new HashSet<>();

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname());

        if (signUpRequest.getRole() == null) {
            Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            signUpRequest.getRole().forEach(role -> {
                Role userRole = roleRepository.findByRoleName(ERole.valueOf(role))
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}