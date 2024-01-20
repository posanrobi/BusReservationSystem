package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import com.thesispr.BusReservationSystem.service.BusLineDateTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/busline-date-time")
public class BusLineDateTimeController {

    private final BusLineDateTimeService busLineDateTimeService;

    @Autowired
    public BusLineDateTimeController(BusLineDateTimeService busLineDateTimeService) {
        this.busLineDateTimeService = busLineDateTimeService;
    }

    @GetMapping
    public List<BusLineDateTime> getAllBusLineDatesAndTime() {
        return busLineDateTimeService.getAllBusLineDatesAndTimes();
    }
}
