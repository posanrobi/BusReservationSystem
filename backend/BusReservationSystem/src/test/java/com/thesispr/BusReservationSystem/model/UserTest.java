package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.HashSet;
import java.util.Set;

/**
 * Unit tests for the User class.
 */
public class UserTest {

    /**
     * Test to verify the no-argument constructor of the User class.
     */
    @Test
    public void testNoArgConstructor() {
        User user = new User();
        /* Assert */
        assertThat(user).isNotNull();
    }

    /**
     * Test to verify the all-argument constructor of the User class.
     */
    @Test
    public void testAllArgConstructor() {
        /* Arrange: Define test data */
        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();

        /* Act: Create a User object using the all-argument constructor */
        User user = new User(username, email, password, firstname, lastname, roles);

        /* Assert: Verify that the user object is not null and properties are set correctly */
        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo(username);
        assertThat(user.getEmail()).isEqualTo(email);
        assertThat(user.getPassword()).isEqualTo(password);
        assertThat(user.getFirstname()).isEqualTo(firstname);
        assertThat(user.getLastname()).isEqualTo(lastname);
        assertThat(user.getRoles()).isEqualTo(roles);
    }

    /**
     * Test to verify the getters and setters of the User class.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Create a User object */
        User user = new User();

        /* Define test data */
        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();

        /* Act: Set properties using setter methods */
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setRoles(roles);

        /* Assert: Verify that getters return expected values */
        assertThat(user.getUsername()).isEqualTo(username);
        assertThat(user.getEmail()).isEqualTo(email);
        assertThat(user.getPassword()).isEqualTo(password);
        assertThat(user.getFirstname()).isEqualTo(firstname);
        assertThat(user.getLastname()).isEqualTo(lastname);
        assertThat(user.getRoles()).isEqualTo(roles);
    }
}
