package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for the BusLineDateTime class.
 */
public class BusLineDateTimeTest {

    /**
     * Test for the no-argument constructor.
     */
    @Test
    public void testNoArgConstructor() {
        /* Arrange: Create a new instance of BusLineDateTime */
        BusLineDateTime busLineDateTime = new BusLineDateTime();

        /* Assert: Verify that the instance is not null */
        assertThat(busLineDateTime).isNotNull();
    }

    /**
     * Test for the all-argument constructor.
     */
    @Test
    public void testAllArgConstructor() {
        /* Arrange: Set up values for constructor arguments */
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);

        /* Act: Create a new instance of BusLineDateTime */
        BusLineDateTime busLineDateTime = new BusLineDateTime(id, date, time, busLine);

        /* Assert: Verify that the instance and its properties are set correctly */
        assertThat(busLineDateTime).isNotNull();
        assertThat(busLineDateTime.getId()).isEqualTo(id);
        assertThat(busLineDateTime.getDate()).isEqualTo(date);
        assertThat(busLineDateTime.getTime()).isEqualTo(time);
        assertThat(busLineDateTime.getBusLine()).isEqualTo(busLine);
    }

    /**
     * Test for getters and setters.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Set up values for constructor arguments */
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);

        /* Act: Create a new instance of BusLineDateTime */
        BusLineDateTime busLineDateTime = new BusLineDateTime();

        /* Set the properties using setters */
        busLineDateTime.setId(id);
        busLineDateTime.setDate(date);
        busLineDateTime.setTime(time);
        busLineDateTime.setBusLine(busLine);

        /* Assert: Verify that the properties are set correctly */
        assertThat(busLineDateTime).isNotNull();
        assertThat(busLineDateTime.getId()).isEqualTo(id);
        assertThat(busLineDateTime.getDate()).isEqualTo(date);
        assertThat(busLineDateTime.getTime()).isEqualTo(time);
        assertThat(busLineDateTime.getBusLine()).isEqualTo(busLine);
    }
}
