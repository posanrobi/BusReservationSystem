package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusLineDateTimeRepository extends JpaRepository<BusLineDateTime, Long> {
    // custom queries
}
