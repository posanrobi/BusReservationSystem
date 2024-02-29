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

/**
 *  Unit tests for the BusLineDateTimeRepository interface.
 */
@ExtendWith(MockitoExtension.class)
public class BusLineDateTimeRepositoryTest {

    /** The mocked BusLineDateTimeRepository object. */
    @Mock
    private BusLineDateTimeRepository busLineDateTimeRepository;

    /**
     * Setup method to initialize mocks.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to verify the findAll method of BusLineDateTimeRepository.
     */
    @Test
    void testFindAll() {
        /* Arrange: Create test data */
        List<BusLineDateTime> busLineDateTimes = new ArrayList<>();
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);
        BusLineDateTime busLineDateTimeObj = new BusLineDateTime(id, date, time, busLine);
        busLineDateTimes.add(busLineDateTimeObj);

        /* Mock the behavior of BusLineDateTimeRepository */
        when(busLineDateTimeRepository.findAll()).thenReturn(busLineDateTimes);

        /* Act: Call the findAll method */
        List<BusLineDateTime> result = busLineDateTimeRepository.findAll();

        /* Assert: Verify the result */
        assertEquals(busLineDateTimes.size(), result.size());
    }
    /**
     * Test to verify the findById method of BusLineDateTimeRepository.
     */
    @Test
    void testFindById() {
        /* Arrange: Create test data */
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 2, 27);
        LocalTime time = LocalTime.of(10, 0);
        BusLine busLine = new BusLine(2L, "BusLine", 5500);
        BusLineDateTime busLineDateTime = new BusLineDateTime(id, date, time, busLine);

        /* Mock the behavior of BusLineDateTimeRepository */
        when(busLineDateTimeRepository.findById(id)).thenReturn(Optional.of(busLineDateTime));

        /* Act: Call the findById method */
        Optional<BusLineDateTime> result = busLineDateTimeRepository.findById(id);

        /* Assert: Verify the result */
        assertEquals(busLineDateTime, result.orElse(null));
    }
}
