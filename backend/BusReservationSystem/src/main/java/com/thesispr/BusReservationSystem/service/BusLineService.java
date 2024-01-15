package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.repository.BusLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusLineService {
    private final BusLineRepository busLineRepository;

    @Autowired
    public BusLineService(BusLineRepository busLineRepository) {
        this.busLineRepository = busLineRepository;
    }

    public List<BusLine> getAllBusLines() {
        return busLineRepository.findAll();
    }

}
