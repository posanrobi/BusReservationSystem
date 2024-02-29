package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.repository.BusLineRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

/**
 * Unit tests for the BusLineService class.
 */
public class BusLineServiceTest {

    /**
     * Mock instance of BusLineRepository used for testing.
     */
    @Mock
    private BusLineRepository busLineRepository;

    /**
     * The instance of BusLineService to be tested.
     */
    @InjectMocks
    private BusLineService busLineService;

    /**
     * Sets up the necessary dependencies for each test.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the getAllBusLines method of BusLineService.
     */
    @Test
    void testGetAllBusLines() {
        /* Arrange: Create mock data */
        Long id1 = 1L;
        String name1 = "TestBusLine1";
        int price1 = 2000;

        Long id2 = 1L;
        String name2 = "TestBusLine2";
        int price2 = 3000;
        BusLine busLine1 = new BusLine(id1, name1, price1);
        BusLine busLine2 = new BusLine(id2, name2, price2);
        List<BusLine> mockData = Arrays.asList(busLine1, busLine2);

        /* Act: Mock the behavior of BusLineRepository and call the method */
        when(busLineRepository.findAll()).thenReturn(mockData);
        List<BusLine> result = busLineService.getAllBusLines();

        /* Assert: Verify that the result matches the expected mock data */
        assertEquals(mockData, result);
    }
}
