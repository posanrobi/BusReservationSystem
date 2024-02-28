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

@ExtendWith(MockitoExtension.class)
public class ReservationRepositoryTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Test
    void testFindAll() {
        List<Reservation> expectedReservations = new ArrayList<>();

        Long id = 1L;
        LocalDate date = LocalDate.of(2024,4,10);
        LocalTime time = LocalTime.of(10,30);
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

        when(reservationRepository.findAll()).thenReturn(expectedReservations);

        List<Reservation> result = reservationRepository.findAll();

        assertEquals(expectedReservations.size(), result.size());
    }
}
