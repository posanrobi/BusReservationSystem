package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for the ERole enum class.
 */
public class ERoleTest {

    /**
     * Test to ensure that role constants are not null.
     */
    @Test
    public void testRolesIsNotNull() {
        /* Assert: Verify that each role constant is not null */
        assertThat(ERole.ROLE_USER).isNotNull();
        assertThat(ERole.ROLE_ADMIN).isNotNull();
    }
}

