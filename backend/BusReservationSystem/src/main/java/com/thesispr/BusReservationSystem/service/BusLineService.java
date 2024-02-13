package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLine;
import com.thesispr.BusReservationSystem.repository.BusLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class responsible for providing operations related to bus lines.
 */
@Service
public class BusLineService {
    private final BusLineRepository busLineRepository;

    /**
     * Constructs a new instance of BusLineService.
     *
     * @param busLineRepository The repository for bus lines.
     */
    @Autowired
    public BusLineService(BusLineRepository busLineRepository) {
        this.busLineRepository = busLineRepository;
    }

    /**
     * Retrieves all bus lines.
     *
     * @return A list of BusLine objects representing all bus lines.
     */
    public List<BusLine> getAllBusLines() {
        return busLineRepository.findAll();
    }

}
