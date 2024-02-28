package com.thesispr.BusReservationSystem.model;

import jakarta.persistence.*;

/**
 * Represents a role entity, used to define roles in the system.
 */
@Entity
@Table(name = "roles")
public class Role {

    /** The unique identifier for the role. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The name of the role. */
    @Enumerated(EnumType.STRING)
    private ERole roleName;

    /** Default constructor for Role. */
    public Role() {
    }

    /**
     * Constructor with full data.
     * @param id Identifier of the role.
     * @param roleName Name of the role.
     */
    public Role(Long id, ERole roleName) {
        this.id = id;
        this.roleName = roleName;
    }

    /**
     * Constructs a role with the specified role name.
     * @param roleName The name of the role.
     */
    public Role(ERole roleName) {
        this.roleName = roleName;
    }

    /**
     * Retrieves the name of the role.
     * @return The name of the role.
     */
    public ERole getRoleName() {
        return roleName;
    }

    /**
     * Sets the name of the role.
     * @param roleName The name of the role.
     */
    public void setRoleName(ERole roleName) {
        this.roleName = roleName;
    }

    /**
     * Retrieves the unique identifier for the role.
     * @return The unique identifier for the role.
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier for the role.
     * @param id The unique identifier for the role.
     */
    public void setId(Long id) {
        this.id = id;
    }
}

