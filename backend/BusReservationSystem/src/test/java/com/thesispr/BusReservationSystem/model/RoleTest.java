package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for the Role class.
 */
public class RoleTest {

    /**
     * Test to verify the no-argument constructor of the Role class.
     */
    @Test
    public void testNoArgConstructor() {
        Role role = new Role();
        /* Assert */
        assertThat(role).isNotNull();
    }

    /**
     * Test to verify the all-argument constructor of the Role class.
     */
    @Test
    public void testAllArgConstructor() {
        /* Arrange: Define test data */
        Long id = 1L;
        ERole eRole = ERole.ROLE_USER;

        /* Act: Create a Role object using the all-argument constructor */
        Role role = new Role(id, eRole);

        /* Assert: Verify that the role object is not null and properties are set correctly */
        assertThat(role).isNotNull();
        assertThat(role.getId()).isEqualTo(id);
        assertThat(role.getRoleName()).isEqualTo(eRole);
    }

    /**
     * Test to verify the getters and setters of the Role class.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Define test data */
        Long id = 1L;
        ERole eRole = ERole.ROLE_USER;

        /* Create a Role object */
        Role role = new Role();

        /* Act: Set properties using setter methods */
        role.setId(id);
        role.setRoleName(eRole);

        /* Assert: Verify that getters return expected values */
        assertThat(role).isNotNull();
        assertThat(role.getId()).isEqualTo(id);
        assertThat(role.getRoleName()).isEqualTo(eRole);
    }
}
