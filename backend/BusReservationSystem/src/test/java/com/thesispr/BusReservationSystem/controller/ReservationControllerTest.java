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

public class ReservationControllerTest {

    @InjectMocks
    private ReservationController reservationController;

    @Mock
    private ReservationService reservationService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateReservation() {
        Reservation reservation = new Reservation();
        reservation.setId(1L);

        when(reservationService.createReservation(any(Reservation.class))).thenReturn(reservation);

        ResponseEntity<?> responseEntity = reservationController.createReservation(reservation);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(reservation, responseEntity.getBody());
    }

    @Test
    public void testGetAllReservations() {
        List<Reservation> mockReservations = new ArrayList<>();
        mockReservations.add(new Reservation());
        mockReservations.add(new Reservation());

        when(reservationService.getAllReservations()).thenReturn(mockReservations);

        List<Reservation> returnedReservations = reservationController.getAllReservations();

        assertEquals(mockReservations, returnedReservations);
    }

    @Test
    public void testDeleteReservation_Success() {
        Long id = 1L;

        ResponseEntity<?> responseEntity = reservationController.deleteReservation(id);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Reservation deleted successfully", responseEntity.getBody());
    }

    @Test
    public void testDeleteReservation_NotFound() {
        Long id = 1L;

        doThrow(new NoSuchElementException()).when(reservationService).deleteReservation(id);

        ResponseEntity<?> responseEntity = reservationController.deleteReservation(id);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Reservation not found", responseEntity.getBody());
    }

    @Test
    public void testDeleteReservation_InternalServerError() {
        Long id = 1L;

        doThrow(new RuntimeException()).when(reservationService).deleteReservation(id);

        ResponseEntity<?> responseEntity = reservationController.deleteReservation(id);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An error occurred while deleting the reservation", responseEntity.getBody());
    }
}
