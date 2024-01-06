package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.ERole;
import com.thesispr.BusReservationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByFirstnameAndLastname(String firstname, String lastname);

    @Query("SELECT u FROM User u WHERE :role MEMBER OF u.roles")
    Set<User> findByRoles(@Param("role") ERole role);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
