package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import com.thesispr.BusReservationSystem.service.BusLineDateTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller class responsible for handling HTTP requests related to bus line dates and times.
 * Provides endpoints for retrieving information about bus line dates and times.
 * Endpoints are prefixed with "/api/busline-date-time".
 * Cross-origin requests are allowed from all origins with a maximum age of 3600 seconds (1 hour).
 * @RestController Indicates that this class is a controller and that the return value of its methods should be written directly to the HTTP response body.
 * @CrossOrigin Annotation for enabling cross-origin requests on specific handler methods or controller classes.
 * @RequestMapping Specifies the base URL path for all endpoints in this controller.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/busline-date-time")
public class BusLineDateTimeController {

    private final BusLineDateTimeService busLineDateTimeService;

    /**
     * Constructor injection of BusLineDateTimeService dependency.
     * @param busLineDateTimeService An instance of BusLineDateTimeService used for retrieving bus line date and time data.
     */
    @Autowired
    public BusLineDateTimeController(BusLineDateTimeService busLineDateTimeService) {
        this.busLineDateTimeService = busLineDateTimeService;
    }

    /**
     * Handles HTTP GET requests to retrieve all bus line dates and times.
     * Retrieves a list of all available bus line dates and times from the BusLineDateTimeService.
     * @return A list of BusLineDateTime objects representing all bus line dates and times.
     */
    @GetMapping
    public List<BusLineDateTime> getAllBusLineDatesAndTime() {
        return busLineDateTimeService.getAllBusLineDatesAndTimes();
    }
}
