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

/**
 * Unit tests for the BusLineDateTimeController class.
 */
public class BusLineDateTimeControllerTest {

    /**
     * The controller under test.
     */
    @InjectMocks
    BusLineDateTimeController busLineDateTimeController;

    /**
     * Mocked bus line date time service.
     */
    @Mock
    BusLineDateTimeService busLineDateTimeService;

    /**
     * Setup method to initialize mocks.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the behavior of retrieving all bus line dates and times from the controller.
     */
    @Test
    public void testGetAllBusLineDatesAndTimes() {
        /* Arrange: Create a list of mock bus line date times */
        List<BusLineDateTime> mockBusLineDateTimeList = new ArrayList<>();
        LocalDate date1 = LocalDate.of(2024, 2, 27);
        LocalTime time1 = LocalTime.of(10, 0);
        LocalDate date2 = LocalDate.of(2024, 2, 29);
        LocalTime time2 = LocalTime.of(12, 30);

        mockBusLineDateTimeList.add(new BusLineDateTime(1L, date1, time1, new BusLine(1L, "TestBusline1",2000)));
        mockBusLineDateTimeList.add(new BusLineDateTime(2L, date2, time2, new BusLine(1L, "TestBusline2",5000)));

        /* Mock the behavior of the bus line date time service to return the mock bus line date times */
        when(busLineDateTimeService.getAllBusLineDatesAndTimes()).thenReturn(mockBusLineDateTimeList);

        /* Act: Call the getAllBusLineDatesAndTimes method on the bus line date time controller */
        List<BusLineDateTime> returnedBusLineDatesAndTimes = busLineDateTimeController.getAllBusLineDatesAndTimes();

        /* Assert: Verify that the bus line date time service's getAllBusLineDatesAndTimes method is called exactly once */
        verify(busLineDateTimeService, times(1)).getAllBusLineDatesAndTimes();

        /* Check that the returned list of bus line date times matches the expected list */
        assertEquals(mockBusLineDateTimeList, returnedBusLineDatesAndTimes);
    }
}
