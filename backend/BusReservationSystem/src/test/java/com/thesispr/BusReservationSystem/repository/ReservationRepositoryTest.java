package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.Reservation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the ReservationRepository interface.
 */
@ExtendWith(MockitoExtension.class)
public class ReservationRepositoryTest {

    /** The mocked ReservationRepository object. */
    @Mock
    private ReservationRepository reservationRepository;

    /**
     * Test to verify the findAll method of ReservationRepository.
     */
    @Test
    void testFindAll() {
        /* Arrange: Create test data */
        List<Reservation> expectedReservations = new ArrayList<>();
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

        expectedReservations.add(reservation);

        /* Mock the behavior of ReservationRepository */
        when(reservationRepository.findAll()).thenReturn(expectedReservations);

        /* Act: Call the findAll method */
        List<Reservation> result = reservationRepository.findAll();

        /* Assert: Verify the result */
        assertEquals(expectedReservations.size(), result.size());
    }
}
