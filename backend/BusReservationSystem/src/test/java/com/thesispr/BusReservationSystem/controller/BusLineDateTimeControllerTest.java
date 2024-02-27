package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import com.thesispr.BusReservationSystem.service.BusLineDateTimeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class BusLineDateTimeControllerTest {
    @InjectMocks
    BusLineDateTimeController busLineDateTimeController;

    @Mock
    BusLineDateTimeService busLineDateTimeService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllBusLineDatesAndTimes() {
        List<BusLineDateTime> mockBusLineDateTimeList = new ArrayList<>();
        LocalDate date1 = LocalDate.of(2024, 2, 27);
        LocalTime time1 = LocalTime.of(10, 0);
        LocalDate date2 = LocalDate.of(2024, 2, 29);
        LocalTime time2 = LocalTime.of(12, 30);

        mockBusLineDateTimeList.add(new BusLineDateTime(1L, date1, time1, new BusLine(1L, "TestBusline1",2000)));
        mockBusLineDateTimeList.add(new BusLineDateTime(2L, date2, time2, new BusLine(1L, "TestBusline2",5000)));

        when(busLineDateTimeService.getAllBusLineDatesAndTimes()).thenReturn(mockBusLineDateTimeList);

        List<BusLineDateTime> returnedBusLineDatesAndTimes = busLineDateTimeController.getAllBusLineDatesAndTimes();

        verify(busLineDateTimeService, times(1)).getAllBusLineDatesAndTimes();

        assertEquals(mockBusLineDateTimeList, returnedBusLineDatesAndTimes);
    }
}
