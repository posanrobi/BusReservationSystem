package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class RoleTest {

    @Test
    public void testNoArgConstructor() {
        Role role = new Role();

        assertThat(role).isNotNull();
    }

    @Test
    public void testAllArgConstructor() {
        Long id = 1L;
        ERole eRole = ERole.ROLE_USER;

        Role role = new Role(id, eRole);

        assertThat(role).isNotNull();
        assertThat(role.getId()).isEqualTo(id);
        assertThat(role.getRoleName()).isEqualTo(eRole);
    }

    @Test
    public void testGettersAndSetters() {
        Long id = 1L;
        ERole eRole = ERole.ROLE_USER;

        Role role = new Role();

        role.setId(id);
        role.setRoleName(eRole);

        assertThat(role).isNotNull();
        assertThat(role.getId()).isEqualTo(id);
        assertThat(role.getRoleName()).isEqualTo(eRole);
    }
}
