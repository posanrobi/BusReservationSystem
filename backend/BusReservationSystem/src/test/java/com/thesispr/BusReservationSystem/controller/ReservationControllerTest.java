package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.Reservation;
import com.thesispr.BusReservationSystem.service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the ReservationController class.
 */
public class ReservationControllerTest {

    /**
     * The controller under test.
     */
    @InjectMocks
    private ReservationController reservationController;

    /**
     * Mocked reservation service.
     */
    @Mock
    private ReservationService reservationService;

    /**
     * Setup method to initialize mocks.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the creation of a reservation.
     */
    @Test
    public void testCreateReservation() {
        /* Arrange: Create a sample reservation and configure mock behavior */
        Reservation reservation = new Reservation();
        reservation.setId(1L);

        when(reservationService.createReservation(any(Reservation.class))).thenReturn(reservation);

        /* Act: Call the method under test */

        ResponseEntity<?> responseEntity = reservationController.createReservation(reservation);

        /* Assert: Verify the response status and body */
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(reservation, responseEntity.getBody());
    }

    /**
     * Test to verify the retrieval of all reservations.
     */
    @Test
    public void testGetAllReservations() {
        /* Assert: Verify the response status and body */
        List<Reservation> mockReservations = new ArrayList<>();
        mockReservations.add(new Reservation());
        mockReservations.add(new Reservation());

        when(reservationService.getAllReservations()).thenReturn(mockReservations);

        /* Act: Call the method under test */
        List<Reservation> returnedReservations = reservationController.getAllReservations();

        /* Assert: Verify that the returned list matches the expected list */
        assertEquals(mockReservations, returnedReservations);
    }

    /**
     * Test to verify successful deletion of a reservation.
     */
    @Test
    public void testDeleteReservation_Success() {
        /* Arrange: Set up the ID of the reservation to be deleted */
        Long id = 1L;

        /* Act: Call the method under test */
        ResponseEntity<?> responseEntity = reservationController.deleteReservation(id);

        /* Assert: Verify the response status and message */
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Reservation deleted successfully", responseEntity.getBody());
    }

    /**
     * Test to verify handling of a reservation not found during deletion.
     */
    @Test
    public void testDeleteReservation_NotFound() {
        /* Arrange: Set up the ID of a reservation that does not exist */
        Long id = 1L;

        /* Mock the service to throw an exception when attempting to delete the reservation */
        doThrow(new NoSuchElementException()).when(reservationService).deleteReservation(id);

        /* Act: Call the method under test */
        ResponseEntity<?> responseEntity = reservationController.deleteReservation(id);

        /* Assert: Verify the response status and message */
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Reservation not found", responseEntity.getBody());
    }

    /**
     * Test to verify handling of an internal server error during deletion.
     */
    @Test
    public void testDeleteReservation_InternalServerError() {
        /* Arrange: Set up the ID of a reservation */
        Long id = 1L;

        /* Mock the service to throw a runtime exception when attempting to delete the reservation */
        doThrow(new RuntimeException()).when(reservationService).deleteReservation(id);

        /* Act: Call the method under test */
        ResponseEntity<?> responseEntity = reservationController.deleteReservation(id);

        /* Assert: Verify the response status and message */
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An error occurred while deleting the reservation", responseEntity.getBody());
    }
}
