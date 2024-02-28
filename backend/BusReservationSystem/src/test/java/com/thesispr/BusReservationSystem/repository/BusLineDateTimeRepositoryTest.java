package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BusLineDateTimeRepositoryTest {

    @Mock
    private BusLineDateTimeRepository busLineDateTimeRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<BusLineDateTime> busLineDateTimes = new ArrayList<>();

        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);

        BusLineDateTime busLineDateTimeObj = new BusLineDateTime(id, date, time, busLine);
        busLineDateTimes.add(busLineDateTimeObj);

        when(busLineDateTimeRepository.findAll()).thenReturn(busLineDateTimes);

        List<BusLineDateTime> result = busLineDateTimeRepository.findAll();

        assertEquals(busLineDateTimes.size(), result.size());
    }

    @Test
    void testFindById() {
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);
        BusLineDateTime busLineDateTime = new BusLineDateTime(id, date, time, busLine);

        when(busLineDateTimeRepository.findById(id)).thenReturn(Optional.of(busLineDateTime));

        Optional<BusLineDateTime> result = busLineDateTimeRepository.findById(id);

        assertEquals(busLineDateTime, result.orElse(null));
    }
}
