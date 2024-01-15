package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BusLineRepository extends JpaRepository<BusLine, Long> {

    @Query("SELECT b FROM BusLine b WHERE b.name = :name")
    List<BusLine> findByName(String name);
}
