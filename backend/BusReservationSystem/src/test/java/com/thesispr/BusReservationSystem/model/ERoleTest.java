package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ERoleTest {

    @Test
    public void testRolesIsNotNull() {
        assertThat(ERole.ROLE_USER).isNotNull();
        assertThat(ERole.ROLE_ADMIN).isNotNull();
    }
}
