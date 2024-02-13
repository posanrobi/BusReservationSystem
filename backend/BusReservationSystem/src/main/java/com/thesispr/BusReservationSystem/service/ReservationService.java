package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.Reservation;
import com.thesispr.BusReservationSystem.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class responsible for providing operations related to reservations.
 */
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    /**
     * Constructs a new instance of ReservationService.
     *
     * @param reservationRepository The repository for reservations.
     */
    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    /**
     * Creates a new reservation.
     *
     * @param reservation The reservation object to be created.
     * @return The created Reservation object.
     */
    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    /**
     * Retrieves all reservations.
     *
     * @return A list of Reservation objects representing all reservations.
     */
    public List<Reservation> getAllReservations() {return reservationRepository.findAll();}

    /**
     * Deletes a reservation by its ID.
     *
     * @param id The ID of the reservation to be deleted.
     */
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    /**
     * Retrieves a reservation by its ID.
     *
     * @param id The ID of the reservation to retrieve.
     * @return An Optional containing the Reservation object if found, otherwise empty.
     */
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

}
