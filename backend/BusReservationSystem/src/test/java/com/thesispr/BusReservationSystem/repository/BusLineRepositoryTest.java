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

@ExtendWith(MockitoExtension.class)
public class BusLineRepositoryTest {

    @Mock
    private BusLineRepository busLineRepository;

    @Test
    void testFindByName() {
        List<BusLine> expectedBusLines = new ArrayList<>();

        Long id = 1L;
        String name = "TestBusLine";
        int price = 5500;
        BusLine busLine = new BusLine(id, name, price);

        expectedBusLines.add(busLine);

        when(busLineRepository.findByName(name)).thenReturn(expectedBusLines);

        List<BusLine> result = busLineRepository.findByName(name);

        assertEquals(expectedBusLines.size(), result.size());
    }
}
