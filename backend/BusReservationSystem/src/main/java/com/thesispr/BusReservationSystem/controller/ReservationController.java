package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.Reservation;
import com.thesispr.BusReservationSystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        // Logic to handle the reservation data, typically involving a service
        Reservation savedReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<>(savedReservation, HttpStatus.CREATED);
    }
}
