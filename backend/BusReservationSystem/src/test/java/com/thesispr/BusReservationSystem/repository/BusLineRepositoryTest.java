package com.thesispr.BusReservationSystem.repository;

import com.thesispr.BusReservationSystem.model.BusLine;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the BusLineRepository interface.
 */
@ExtendWith(MockitoExtension.class)
public class BusLineRepositoryTest {

    /** The mocked BusLineRepository object. */
    @Mock
    private BusLineRepository busLineRepository;

    /**
     * Test to verify the findByName method of BusLineRepository.
     */
    @Test
    void testFindByName() {
        /* Arrange: Create test data */
        List<BusLine> expectedBusLines = new ArrayList<>();
        Long id = 1L;
        String name = "TestBusLine";
        int price = 5500;
        BusLine busLine = new BusLine(id, name, price);
        expectedBusLines.add(busLine);

        /* Mock the behavior of BusLineRepository */
        when(busLineRepository.findByName(name)).thenReturn(expectedBusLines);

        /* Act: Call the findByName method */
        List<BusLine> result = busLineRepository.findByName(name);

        /* Assert: Verify the result */
        assertEquals(expectedBusLines.size(), result.size());
    }
}
