package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // custom queries
}