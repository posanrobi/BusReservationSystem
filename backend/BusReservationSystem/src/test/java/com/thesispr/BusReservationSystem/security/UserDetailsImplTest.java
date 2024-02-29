package com.thesispr.BusReservationSystem.security;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.Role;
import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.security.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the UserDetailsImpl class.
 */
class UserDetailsImplTest {

    /**
     * Test to verify the build method of UserDetailsImpl.
     */
    @Test
    void testBuild() {
        /* Arrange: Create a user with roles */
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setFirstname("John");
        user.setLastname("Doe");

        Role role = new Role();
        role.setId(1L);
        ERole erole = ERole.ROLE_USER;
        role.setRoleName(erole);
        user.setRoles(Collections.singleton(role));

        /* Act: Call the build method */
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

        /* Assert: Verify the user details */
        assertEquals(user.getId(), userDetails.getId());
        assertEquals(user.getUsername(), userDetails.getUsername());
        assertEquals(user.getEmail(), userDetails.getEmail());
        assertEquals(user.getPassword(), userDetails.getPassword());

        /* Verify authorities */
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        assertEquals(1, authorities.size());
        assertEquals("ROLE_USER", authorities.iterator().next().getAuthority());
    }
}
