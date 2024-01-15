package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLineDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusLineDateRepository extends JpaRepository<BusLineDate, Long> {
    // custom queries
}
