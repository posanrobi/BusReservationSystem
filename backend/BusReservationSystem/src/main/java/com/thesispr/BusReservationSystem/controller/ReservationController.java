package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.Reservation;
import com.thesispr.BusReservationSystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Controller class responsible for handling HTTP requests related to reservations.
 * Provides endpoints for creating, retrieving, and deleting reservations.
 * Endpoints are prefixed with "/api/reservations".
 * Cross-origin requests are allowed from all origins with a maximum age of 3600 seconds (1 hour).
 * @RestController Indicates that this class is a controller and that the return value of its methods should be written directly to the HTTP response body.
 * @CrossOrigin Annotation for enabling cross-origin requests on specific handler methods or controller classes.
 * @RequestMapping Specifies the base URL path for all endpoints in this controller.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Constructor injection of ReservationService dependency.
     * @param reservationService An instance of ReservationService used for handling reservation-related operations.
     */
    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Handles HTTP POST requests to create a new reservation.
     * Creates a new reservation using the provided reservation data and returns the created reservation.
     * @param reservation The reservation object containing data for the new reservation.
     * @return A ResponseEntity containing the created reservation and an HTTP status code of 201 (Created).
     */
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        Reservation savedReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<>(savedReservation, HttpStatus.CREATED);
    }

    /**
     * Handles HTTP GET requests to retrieve all reservations.
     * Retrieves a list of all reservations and returns it.
     * @return A list of Reservation objects representing all reservations.
     */
    @GetMapping
    public List<Reservation> getAllReservations() { return reservationService.getAllReservations(); }

    /**
     * Handles HTTP DELETE requests to delete a reservation by ID.
     * Deletes the reservation with the specified ID and returns an appropriate response.
     * @param id The ID of the reservation to be deleted.
     * @return A ResponseEntity containing a message indicating the result of the deletion operation and an appropriate HTTP status code.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return new ResponseEntity<>("Reservation deleted successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the reservation", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
