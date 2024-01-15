package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.model.BusLineDate;
import com.thesispr.BusReservationSystem.repository.BusLineDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusLineDateService {

    private final BusLineDateRepository busLineDateRepository;

    @Autowired
    public BusLineDateService(BusLineDateRepository busLineDateRepository) {
        this.busLineDateRepository = busLineDateRepository;
    }

    public List<BusLineDate> getAllBusLineDates() {
        return busLineDateRepository.findAll();
    }

}
