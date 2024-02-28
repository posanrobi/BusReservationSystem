package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class UserTest {

    @Test
    public void testNoArgConstructor() {
        User user = new User();

        assertThat(user).isNotNull();
    }

    @Test
    public void testAllArgConstructor() {
        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();

        User user = new User(username, email, password, firstname, lastname, roles);

        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo(username);
        assertThat(user.getEmail()).isEqualTo(email);
        assertThat(user.getPassword()).isEqualTo(password);
        assertThat(user.getFirstname()).isEqualTo(firstname);
        assertThat(user.getLastname()).isEqualTo(lastname);
        assertThat(user.getRoles()).isEqualTo(roles);
    }

    @Test
    public void testGettersAndSetters() {
        User user = new User();

        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        String firstname = "John";
        String lastname = "Doe";
        Set<Role> roles = new HashSet<>();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setRoles(roles);

        assertThat(user.getUsername()).isEqualTo(username);
        assertThat(user.getEmail()).isEqualTo(email);
        assertThat(user.getPassword()).isEqualTo(password);
        assertThat(user.getFirstname()).isEqualTo(firstname);
        assertThat(user.getLastname()).isEqualTo(lastname);
        assertThat(user.getRoles()).isEqualTo(roles);
    }
}
