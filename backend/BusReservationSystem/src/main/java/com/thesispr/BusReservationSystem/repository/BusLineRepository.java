package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repository interface for managing BusLine entities.
 */
public interface BusLineRepository extends JpaRepository<BusLine, Long> {

    /**
     * Retrieves a list of bus lines by their name.
     * @param name The name of the bus line.
     * @return A list of bus lines with the specified name.
     */
    @Query("SELECT b FROM BusLine b WHERE b.name = :name")
    List<BusLine> findByName(String name);
}
