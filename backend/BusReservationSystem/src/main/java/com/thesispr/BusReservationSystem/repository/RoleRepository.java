package com.thesispr.BusReservationSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.Role;

/**
 * Repository interface for managing Role entities.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Retrieves a role by its name.
     *
     * @param name The name of the role.
     * @return An optional containing the role if found, empty otherwise.
     */
    Optional<Role> findByRoleName(ERole name);
}