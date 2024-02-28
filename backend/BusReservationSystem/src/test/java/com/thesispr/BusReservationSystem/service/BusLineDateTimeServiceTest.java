package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import com.thesispr.BusReservationSystem.repository.BusLineDateTimeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class BusLineDateTimeServiceTest {

    @Mock
    private BusLineDateTimeRepository busLineDateTimeRepository;

    @InjectMocks
    private BusLineDateTimeService busLineDateTimeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBusLineDatesAndTimes() {
        Long id1 = 1L;
        LocalDate date1 = LocalDate.of(2024, 2, 27);
        LocalTime time1 = LocalTime.of(10, 0);
        BusLine busLine1 = new BusLine(2L, "BusLine1", 5500);

        Long id2 = 1L;
        LocalDate date2 = LocalDate.of(2024, 2, 28);
        LocalTime time2 = LocalTime.of(12, 30);
        BusLine busLine2 = new BusLine(2L, "BusLine2", 3000);

        BusLineDateTime dateTime1 = new BusLineDateTime(id1, date1, time1, busLine1);
        BusLineDateTime dateTime2 = new BusLineDateTime(id2, date2, time2, busLine2);
        List<BusLineDateTime> mockData = Arrays.asList(dateTime1, dateTime2);

        when(busLineDateTimeRepository.findAll()).thenReturn(mockData);

        List<BusLineDateTime> result = busLineDateTimeService.getAllBusLineDatesAndTimes();

        assertEquals(mockData, result);
    }
}
