package com.thesispr.BusReservationSystem.security.services;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serial;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.thesispr.BusReservationSystem.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Implementation of Spring Security's UserDetails interface to represent a custom user details object.
 */
public class UserDetailsImpl implements UserDetails {

        @Serial
        private static final long serialVersionUID = 1L;

        private final Long id;
        private final String username;
        private final String email;
        @JsonIgnore
        private final String password;
        private final String firstname;
        private final String lastname;
        private final Collection<? extends GrantedAuthority> authorities;

    /**
     * Constructs a UserDetailsImpl object.
     *
     * @param id          The user's ID.
     * @param username    The user's username.
     * @param email       The user's email address.
     * @param password    The user's password.
     * @param firstname   The user's first name.
     * @param lastname    The user's last name.
     * @param authorities The authorities granted to the user.
     */
    public UserDetailsImpl(Long id, String username, String email, String password, String firstname, String lastname,
                           Collection<? extends GrantedAuthority> authorities) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.authorities = authorities;
            this.firstname = firstname;
            this.lastname = lastname;
        }

    /**
     * Builds a UserDetailsImpl object from the given User entity.
     *
     * @param user The user entity.
     * @return UserDetailsImpl object representing the user details.
     */
        public static UserDetailsImpl build(User user) {
            List<GrantedAuthority> authorities = user.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
                    .collect(Collectors.toList());

            return new UserDetailsImpl(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getFirstname(),
                    user.getLastname(),
                    authorities);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorities;
        }

        public Long getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }

        @Override
        public String getPassword() {
            return password;
        }

        @Override
        public String getUsername() {
            return username;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            UserDetailsImpl user = (UserDetailsImpl) o;
            return Objects.equals(id, user.id);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id);
        }

}