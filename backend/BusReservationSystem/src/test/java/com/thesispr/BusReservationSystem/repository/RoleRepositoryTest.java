package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.Role;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the RoleRepository interface.
 */
@ExtendWith(MockitoExtension.class)
public class RoleRepositoryTest {

    /** The mocked RoleRepository object. */
    @Mock
    private RoleRepository roleRepository;

    /**
     * Test to verify the findByRoleName method of RoleRepository.
     */
    @Test
    void testFindByRoleName() {
        /* Arrange: Define test data */
        ERole roleName = ERole.ROLE_USER;
        Role expectedRole = new Role(1L, roleName);

        /* Mock the behavior of RoleRepository */
        when(roleRepository.findByRoleName(roleName)).thenReturn(Optional.of(expectedRole));

        /* Act: Call the findByRoleName method */
        Optional<Role> result = roleRepository.findByRoleName(roleName);

        /* Assert: Verify the result */
        assertEquals(expectedRole, result.orElse(null));
    }
}
