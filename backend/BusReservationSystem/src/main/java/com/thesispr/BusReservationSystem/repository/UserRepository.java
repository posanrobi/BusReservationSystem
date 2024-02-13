package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

/**
 * Repository interface for managing User entities.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Finds a user by username.
     *
     * @param username The username of the user.
     * @return An optional containing the user if found, empty otherwise.
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by email.
     *
     * @param email The email of the user.
     * @return An optional containing the user if found, empty otherwise.
     */
    Optional<User> findByEmail(String email);

    /**
     * Finds a user by first name and last name.
     *
     * @param firstname The first name of the user.
     * @param lastname The last name of the user.
     * @return An optional containing the user if found, empty otherwise.
     */
    Optional<User> findByFirstnameAndLastname(String firstname, String lastname);

    /**
     * Finds users by role.
     *
     * @param role The role to search for.
     * @return A set of users with the specified role.
     */
    @Query("SELECT u FROM User u WHERE :role MEMBER OF u.roles")
    Set<User> findByRoles(@Param("role") ERole role);

    /**
     * Checks if a user exists with the given email.
     *
     * @param email The email to check.
     * @return True if a user exists with the email, false otherwise.
     */
    boolean existsByEmail(String email);

    /**
     * Checks if a user exists with the given username.
     *
     * @param username The username to check.
     * @return True if a user exists with the username, false otherwise.
     */
    boolean existsByUsername(String username);
}
