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

public class BusLineControllerTest {

    @InjectMocks
    BusLineController busLineController;

    @Mock
    private BusLineService busLineService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllBusLines() {
        List<BusLine> mockBusLines = new ArrayList<>();
        mockBusLines.add(new BusLine(1L,"BusLine1", 2000));
        mockBusLines.add(new BusLine(2L, "BusLine2", 3000));

        when(busLineService.getAllBusLines()).thenReturn(mockBusLines);

        List<BusLine> returnedBusLines = busLineController.getAllBusLines();

        verify(busLineService, times(1)).getAllBusLines();

        assertEquals(mockBusLines, returnedBusLines);
    }

}
