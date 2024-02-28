package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.Role;
import com.thesispr.BusReservationSystem.payload.request.LoginRequest;
import com.thesispr.BusReservationSystem.payload.request.SignupRequest;
import com.thesispr.BusReservationSystem.payload.response.JwtResponse;
import com.thesispr.BusReservationSystem.payload.response.MessageResponse;
import com.thesispr.BusReservationSystem.repository.RoleRepository;
import com.thesispr.BusReservationSystem.repository.UserRepository;
import com.thesispr.BusReservationSystem.security.jwt.JwtUtils;
import com.thesispr.BusReservationSystem.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the AuthController class.
 */
public class AuthControllerTest {

    /**
     * The controller under test.
     */
    @InjectMocks
    private AuthController authController;

    /**
     * Mocked authentication manager.
     */
    @Mock
    private AuthenticationManager authenticationManager;

    /**
     * Mocked user repository.
     */
    @Mock
    private UserRepository userRepository;

    /**
     * Mocked role repository.
     */
    @Mock
    private RoleRepository roleRepository;

    /**
     * Mocked password encoder.
     */
    @Mock
    private PasswordEncoder encoder;

    /**
     * Mocked JWT utility.
     */
    @Mock
    private JwtUtils jwtUtils;

    /**
     * Setup method to initialize mocks.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test for authenticating a user.
     * It verifies that authentication is successful and a JWT response is returned.
     */
    @Test
    public void testAuthenticateUser() {
        /* Setup data. */
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("testpassword");

        /* Mocking authentication process. */
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        /* Mocking user details for authenticated user */
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "test@test.com", "password", "John","Doe", Collections.emptyList());
        when(authentication.getPrincipal()).thenReturn(userDetails);

        /* Mocking JWT token generation */
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("testjwt");

        /* Execute the method under test */
        ResponseEntity<?> responseEntity = authController.authenticateUser(loginRequest);

        /* Verification */
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(JwtResponse.class, Objects.requireNonNull(responseEntity.getBody()).getClass());
    }

    /**
     * Test for registering a new user.
     * It verifies that user registration is successful and a message response is returned.
     */
    @Test
    public void testRegisterUser() {
        /* Setup */
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser");
        signupRequest.setEmail("test@test.com");
        signupRequest.setPassword("password");
        signupRequest.setFirstname("John");
        signupRequest.setLastname("Doe");

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        signupRequest.setRole(roles);

        /* Mocking user existence checks */
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);

        /* Mocking role retrieval for the user */
        Role role = new Role();
        role.setId(1L);
        role.setRoleName(ERole.valueOf("ROLE_USER"));
        when(roleRepository.findByRoleName(any())).thenReturn(Optional.of(role));

        /* Mocking password encoding */
        when(encoder.encode("testpassword")).thenReturn("encodedpassword");

        /* Execute the method under test */
        ResponseEntity<?> responseEntity = authController.registerUser(signupRequest);

        /* Verification */
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(MessageResponse.class, Objects.requireNonNull(responseEntity.getBody()).getClass());
    }

}
