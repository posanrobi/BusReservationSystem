package com.thesispr.BusReservationSystem.service;

import com.thesispr.BusReservationSystem.model.BusLineDateTime;
import com.thesispr.BusReservationSystem.repository.BusLineDateTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class responsible for providing operations related to bus line dates and times.
 */
@Service
public class BusLineDateTimeService {

    private final BusLineDateTimeRepository busLineDateTimeRepository;

    /**
     * Constructs a new instance of BusLineDateTimeService.
     *
     * @param busLineDateTimeRepository The repository for bus line dates and times.
     */
    @Autowired
    public BusLineDateTimeService(BusLineDateTimeRepository busLineDateTimeRepository) {
        this.busLineDateTimeRepository = busLineDateTimeRepository;
    }

    /**
     * Retrieves all bus line dates and times.
     *
     * @return A list of BusLineDateTime objects representing all bus line dates and times.
     */
    public List<BusLineDateTime> getAllBusLineDatesAndTimes() {
        return busLineDateTimeRepository.findAll();
    }

}
