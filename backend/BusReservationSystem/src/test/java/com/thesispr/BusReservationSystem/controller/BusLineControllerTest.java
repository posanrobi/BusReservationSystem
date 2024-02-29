package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.service.BusLineService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the BusLineController class.
 */
public class BusLineControllerTest {

    /**
     * The controller under test.
     */
    @InjectMocks
    BusLineController busLineController;

    /**
     * Mocked bus line service.
     */
    @Mock
    private BusLineService busLineService;

    /**
     * Setup method to initialize mocks.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test for getting all bus lines.
     */
    @Test
    public void testGetAllBusLines() {
        /* Arrange: Create a list of mock bus lines */
        List<BusLine> mockBusLines = new ArrayList<>();
        mockBusLines.add(new BusLine(1L,"BusLine1", 2000));
        mockBusLines.add(new BusLine(2L, "BusLine2", 3000));

        /* Mock the behavior of the bus line service to return the mock bus lines */
        when(busLineService.getAllBusLines()).thenReturn(mockBusLines);

        /* Act: Call the getAllBusLines method on Check that the returned list of bus lines matches the expected listthe bus line controller */
        List<BusLine> returnedBusLines = busLineController.getAllBusLines();

        /* Assert: Verify that the bus line service's getAllBusLines method is called exactly once */
        verify(busLineService, times(1)).getAllBusLines();

        /* Check that the returned list of bus lines matches the expected list */
        assertEquals(mockBusLines, returnedBusLines);
    }
}
