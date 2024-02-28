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

public class BusLineServiceTest {

    @Mock
    private BusLineRepository busLineRepository;

    @InjectMocks
    private BusLineService busLineService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBusLines() {
        Long id1 = 1L;
        String name1 = "TestBusLine1";
        int price1 = 2000;

        Long id2 = 1L;
        String name2 = "TestBusLine2";
        int price2 = 3000;
        BusLine busLine1 = new BusLine(id1, name1, price1);
        BusLine busLine2 = new BusLine(id2, name2, price2);
        List<BusLine> mockData = Arrays.asList(busLine1, busLine2);

        when(busLineRepository.findAll()).thenReturn(mockData);

        List<BusLine> result = busLineService.getAllBusLines();

        assertEquals(mockData, result);
    }
}
