package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.Reservation;
import com.thesispr.BusReservationSystem.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public Reservation createReservation(Reservation reservation) {

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {return reservationRepository.findAll();}

}
