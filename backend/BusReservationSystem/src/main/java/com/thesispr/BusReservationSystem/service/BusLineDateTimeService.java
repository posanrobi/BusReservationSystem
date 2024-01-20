package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import com.thesispr.BusReservationSystem.repository.BusLineDateTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusLineDateTimeService {

    private final BusLineDateTimeRepository busLineDateTimeRepository;

    @Autowired
    public BusLineDateTimeService(BusLineDateTimeRepository busLineDateTimeRepository) {
        this.busLineDateTimeRepository = busLineDateTimeRepository;
    }

    public List<BusLineDateTime> getAllBusLineDatesAndTimes() {
        return busLineDateTimeRepository.findAll();
    }

}
