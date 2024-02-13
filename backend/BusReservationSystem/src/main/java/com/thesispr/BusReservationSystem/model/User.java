package com.thesispr.BusReservationSystem.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Represents a user entity.
 */
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    /** The unique identifier for the user. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /** The username of the user. */
    @Column(name = "username", nullable = false)
    private String username;

    /** The first name of the user. */
    @Column(name = "firstname")
    private String firstname;

    /** The last name of the user. */
    @Column(name = "lastname")
    private String lastname;

    /** The email address of the user. */
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    /** The password of the user. */
    @Column(name = "password", nullable = false)
    private String password;

    /** The set of roles associated with the user. */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    /** Default constructor for User. */
    public User() {}

    /**
     * Constructs a user with the specified username, email, and password.
     * @param username The username of the user.
     * @param email The email address of the user.
     * @param password The password of the user.
     */
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * Constructs a user with the specified username, email, password, first name, and last name.
     * @param username The username of the user.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @param firstname The first name of the user.
     * @param lastname The last name of the user.
     */
    public User(String username, String email, String password, String firstname, String lastname) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    /**
     * Constructs a user with the specified username, email, password, first name, last name, and roles.
     * @param username The username of the user.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @param firstname The first name of the user.
     * @param lastname The last name of the user.
     * @param roles The set of roles associated with the user.
     */
    public User(String username, String email, String password, String firstname, String lastname, Set<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.roles = roles;
    }

    /**
     * Retrieves the unique identifier for the user.
     * @return The unique identifier for the user.
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier for the user.
     * @param id The unique identifier for the user.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the username of the user.
     * @return The username of the user.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     * @param username The username of the user.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the first name of the user.
     * @return The first name of the user.
     */
    public String getFirstname() {
        return firstname;
    }

    /**
     * Sets the first name of the user.
     * @param firstname The first name of the user.
     */
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    /**
     * Retrieves the last name of the user.
     * @return The last name of the user.
     */
    public String getLastname() {
        return lastname;
    }

    /**
     * Sets the last name of the user.
     * @param lastname The last name of the user.
     */
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    /**
     * Retrieves the email address of the user.
     * @return The email address of the user.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address of the user.
     * @param email The email address of the user.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retrieves the password of the user.
     * @return The password of the user.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     * @param password The password of the user.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Retrieves the set of roles associated with the user.
     * @return The set of roles associated with the user.
     */
    public Set<Role> getRoles() {
        return roles;
    }

    /**
     * Sets the set of roles associated with the user.
     * @param roles The set of roles associated with the user.
     */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
