package com.thesispr.BusReservationSystem.controller;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.service.BusLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller class responsible for handling HTTP requests related to bus lines.
 * Provides endpoints for retrieving information about bus lines.
 * Endpoints are prefixed with "/api/bus-lines".
 * Cross-origin requests are allowed from all origins with a maximum age of 3600 seconds (1 hour).
 * @RestController Indicates that this class is a controller and that the return value of its methods should be written directly to the HTTP response body.
 * @CrossOrigin Annotation for enabling cross-origin requests on specific handler methods or controller classes.
 * @RequestMapping Specifies the base URL path for all endpoints in this controller.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bus-lines")
public class BusLineController {

    private final BusLineService busLineService;

    /**
     * Constructor injection of BusLineService dependency.
     * @param busLineService An instance of BusLineService used for retrieving bus line data.
     */
    @Autowired
    public BusLineController(BusLineService busLineService) {
        this.busLineService = busLineService;
    }

    /**
     * Handles HTTP GET requests to retrieve all bus lines.
     * Retrieves a list of all available bus lines from the BusLineService.
     * @return A list of BusLine objects representing all bus lines.
     */
    @GetMapping
    public List<BusLine> getAllBusLines() {
        return busLineService.getAllBusLines();
    }
}
