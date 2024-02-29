package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.LocalTime;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for the Reservation class.
 */
public class ReservationTest {

    /**
     * Test to verify the getters and setters of the Reservation class.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Define test data */
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 4, 10);
        LocalTime time = LocalTime.of(10, 30);
        String busLine = "TestBusLine";
        String user = "Test User";
        int seatNumber = 2;
        int price = 8000;
        String username = "testuser";
        String selectedSeats = "3, 7";

        /* Create a Reservation object */
        Reservation reservation = new Reservation();

        /* Act: Set properties using setter methods */
        reservation.setId(id);
        reservation.setReservation_date(date);
        reservation.setReservation_time(time);
        reservation.setBus_line(busLine);
        reservation.setUser(user);
        reservation.setSeat_number(seatNumber);
        reservation.setPrice(price);
        reservation.setUsername(username);
        reservation.setSelected_seats(selectedSeats);

        /* Assert: Verify that getters return expected values */
        assertThat(reservation).isNotNull();
        assertThat(reservation.getId()).isEqualTo(id);
        assertThat(reservation.getReservation_date()).isEqualTo(date);
        assertThat(reservation.getReservation_time()).isEqualTo(time);
        assertThat(reservation.getBus_line()).isEqualTo(busLine);
        assertThat(reservation.getUser()).isEqualTo(user);
        assertThat(reservation.getSeat_number()).isEqualTo(seatNumber);
        assertThat(reservation.getPrice()).isEqualTo(price);
        assertThat(reservation.getUsername()).isEqualTo(username);
        assertThat(reservation.getSelected_seats()).isEqualTo(selectedSeats);
    }
}
