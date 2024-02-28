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

@ExtendWith(MockitoExtension.class)
public class RoleRepositoryTest {

    @Mock
    private RoleRepository roleRepository;

    @Test
    void testFindByRoleName() {
        // Given
        ERole roleName = ERole.ROLE_USER;
        Role expectedRole = new Role(1L, roleName);

        when(roleRepository.findByRoleName(roleName)).thenReturn(Optional.of(expectedRole));

        // When
        Optional<Role> result = roleRepository.findByRoleName(roleName);

        // Then
        assertEquals(expectedRole, result.orElse(null));
    }
}
