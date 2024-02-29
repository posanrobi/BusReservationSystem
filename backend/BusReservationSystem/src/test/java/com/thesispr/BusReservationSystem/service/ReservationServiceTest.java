package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.Reservation;
import com.thesispr.BusReservationSystem.repository.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the ReservationService class.
 */
public class ReservationServiceTest {

    /**
     * Mock instance of ReservationRepository used for testing.
     */
    @Mock
    private ReservationRepository reservationRepository;

    /**
     * The instance of ReservationService to be tested.
     */
    @InjectMocks
    private ReservationService reservationService;

    /**
     * Sets up the necessary dependencies for each test.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the createReservation method of ReservationService.
     */
    @Test
    void testCreateReservation() {
        /* Arrange: Create a reservation and mock the save operation */
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 4, 10);
        LocalTime time = LocalTime.of(10, 30);
        String busLine = "TestBusLine";
        String user = "Test User";
        int seatNumber = 2;
        int price = 8000;
        String username = "testuser";
        String selectedSeats = "3, 7";

        Reservation reservation = new Reservation();
        reservation.setId(id);
        reservation.setReservation_date(date);
        reservation.setReservation_time(time);
        reservation.setBus_line(busLine);
        reservation.setUser(user);
        reservation.setSeat_number(seatNumber);
        reservation.setPrice(price);
        reservation.setUsername(username);
        reservation.setSelected_seats(selectedSeats);

        when(reservationRepository.save(reservation)).thenReturn(reservation);

        /* Act: Call the createReservation method */
        Reservation createdReservation = reservationService.createReservation(reservation);

        /* Assert: Verify that the returned reservation matches the mock data */
        assertEquals(reservation, createdReservation);
    }

    /**
     * Test to verify the getAllReservations method of ReservationService.
     */
    @Test
    void testGetAllReservations() {
        /* Arrange: Create mock reservation data */
        List<Reservation> mockData = new ArrayList<>();
        Reservation reservation = new Reservation();
        mockData.add(reservation);

        when(reservationRepository.findAll()).thenReturn(mockData);

        /* Act: Call the getAllReservations method */
        List<Reservation> result = reservationService.getAllReservations();

        /* Assert: Verify that the returned list matches the mock data */
        assertEquals(mockData, result);
    }

    /**
     * Test to verify the deleteReservation method of ReservationService.
     */
    @Test
    void testDeleteReservation() {
        /* Act: Call the deleteReservation method */
        reservationService.deleteReservation(1L);

        /* Assert: Verify that the deleteById method of ReservationRepository is called with the correct argument */
        verify(reservationRepository, times(1)).deleteById(1L);
    }

    /**
     * Test to verify the getReservationById method of ReservationService.
     */
    @Test
    void testGetReservationById() {
        /* Arrange: Create mock reservation data */
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 4, 10);
        LocalTime time = LocalTime.of(10, 30);
        String busLine = "TestBusLine";
        String user = "Test User";
        int seatNumber = 2;
        int price = 8000;
        String username = "testuser";
        String selectedSeats = "3, 7";

        Reservation reservation = new Reservation();
        reservation.setId(id);
        reservation.setReservation_date(date);
        reservation.setReservation_time(time);
        reservation.setBus_line(busLine);
        reservation.setUser(user);
        reservation.setSeat_number(seatNumber);
        reservation.setPrice(price);
        reservation.setUsername(username);
        reservation.setSelected_seats(selectedSeats);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        /* Act: Call the getReservationById method */
        Optional<Reservation> result = reservationService.getReservationById(1L);

        /* Assert: Verify that the returned optional contains the mock reservation */
        assertTrue(result.isPresent());
        assertEquals(reservation, result.get());
    }
}
