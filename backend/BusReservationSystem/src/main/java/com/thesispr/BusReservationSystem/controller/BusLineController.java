package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.service.BusLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bus-lines")
public class BusLineController {

    private final BusLineService busLineService;

    @Autowired
    public BusLineController(BusLineService busLineService) {
        this.busLineService = busLineService;
    }

    @GetMapping
    public List<BusLine> getAllBusLines() {
        return busLineService.getAllBusLines();
    }
}
