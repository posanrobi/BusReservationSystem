package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.model.BusLineDate;
import com.thesispr.BusReservationSystem.service.BusLineDateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bus-line-dates")
public class BusLineDateController {

    private final BusLineDateService busLineDateService;

    @Autowired
    public BusLineDateController(BusLineDateService busLineDateService) {
        this.busLineDateService = busLineDateService;
    }

    @GetMapping
    public List<BusLineDate> getAllBusLineDates() {
        return busLineDateService.getAllBusLineDates();
    }
}
