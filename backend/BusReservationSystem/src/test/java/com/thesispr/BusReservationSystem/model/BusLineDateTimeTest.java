package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

public class BusLineDateTimeTest {

    @Test
    public void testNoArgConstructor() {
        BusLineDateTime busLineDateTime = new BusLineDateTime();

        assertThat(busLineDateTime).isNotNull();
    }

    @Test
    public void testAllArgConstructor() {
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);

        BusLineDateTime busLineDateTime = new BusLineDateTime(id, date, time, busLine);

        assertThat(busLineDateTime).isNotNull();
        assertThat(busLineDateTime.getId()).isEqualTo(id);
        assertThat(busLineDateTime.getDate()).isEqualTo(date);
        assertThat(busLineDateTime.getTime()).isEqualTo(time);
        assertThat(busLineDateTime.getBusLine()).isEqualTo(busLine);
    }

    @Test
    public void testGettersAndSetters() {
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);

        BusLineDateTime busLineDateTime = new BusLineDateTime();
        busLineDateTime.setId(id);
        busLineDateTime.setDate(date);
        busLineDateTime.setTime(time);
        busLineDateTime.setBusLine(busLine);

        assertThat(busLineDateTime).isNotNull();
        assertThat(busLineDateTime.getId()).isEqualTo(id);
        assertThat(busLineDateTime.getDate()).isEqualTo(date);
        assertThat(busLineDateTime.getTime()).isEqualTo(time);
        assertThat(busLineDateTime.getBusLine()).isEqualTo(busLine);
    }
}
