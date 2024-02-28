package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class BusLineDateTimeRepositoryTest {

    @Autowired
    private BusLineDateTimeRepository busLineDateTimeRepository;

    @Test
    public void testSaveAndRetrieveBusLineDateTime() {
        // Given
        BusLineDateTime busLineDateTime = new BusLineDateTime();
        LocalDate date = LocalDate.of(2024,2,27);
        LocalTime time = LocalTime.of(10,00,00);
        busLineDateTime.setDate(date);
        busLineDateTime.setTime(time);

        // When
        BusLineDateTime savedBusLineDateTime = busLineDateTimeRepository.save(busLineDateTime);
        BusLineDateTime retrievedBusLineDateTime = busLineDateTimeRepository.findById(savedBusLineDateTime.getId()).orElse(null);

        // Then
        assertNotNull(retrievedBusLineDateTime);
        assertEquals(date, retrievedBusLineDateTime.getDate());
        assertEquals(time, retrievedBusLineDateTime.getTime());
    }
}
