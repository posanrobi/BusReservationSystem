package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.Role;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.payload.request.LoginRequest;
import com.thesispr.BusReservationSystem.payload.request.SignupRequest;
import com.thesispr.BusReservationSystem.payload.response.JwtResponse;
import com.thesispr.BusReservationSystem.payload.response.MessageResponse;
import com.thesispr.BusReservationSystem.repository.RoleRepository;
import com.thesispr.BusReservationSystem.repository.UserRepository;
import com.thesispr.BusReservationSystem.security.jwt.JwtUtils;
import com.thesispr.BusReservationSystem.security.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private JwtUtils jwtUtils;

    @Test
    void testAuthenticateUser() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("testpassword");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "test@test.com", "password", Collections.emptyList());
        when(authentication.getPrincipal()).thenReturn(userDetails);

        when(jwtUtils.generateJwtToken(authentication)).thenReturn("testjwt");

        ResponseEntity<?> responseEntity = authController.authenticateUser(loginRequest);

        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(JwtResponse.class, responseEntity.getBody().getClass());
    }

    @Test
    void testRegisterUser() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser");
        signupRequest.setEmail("test@test.com");
        signupRequest.setPassword("testpassword");
        signupRequest.setFirstname("Test");
        signupRequest.setLastname("User");
        signupRequest.setRole(Collections.singletonList("ROLE_USER"));

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);

        Role role = new Role();
        role.setId(1L);
        role.setRoleName("ROLE_USER");
        when(roleRepository.findByRoleName(any())).thenReturn(Optional.of(role));

        when(encoder.encode("testpassword")).thenReturn("encodedpassword");

        ResponseEntity<?> responseEntity = authController.registerUser(signupRequest);

        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(MessageResponse.class, responseEntity.getBody().getClass());
    }
}
