package com.thesispr.BusReservationSystem.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Entity class representing a specific date and time for a bus line.
 * Annotated with @Entity to indicate that instances of this class are JPA entities.
 */
@Entity
public class BusLineDateTime {

    /**
     * Unique identifier for the bus line date and time.
     * Annotated with @Id to specify the primary key of the entity.
     * Annotated with @GeneratedValue to indicate that the ID is automatically generated.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Date of the bus line. */
    private LocalDate date;

    /** Time of the bus line. */
    private LocalTime time;

    /**
     * The bus line associated with this date and time.
     * Annotated with @ManyToOne to specify a many-to-one relationship with BusLine.
     * Annotated with @JoinColumn to specify the foreign key column name.
     */
    @ManyToOne
    @JoinColumn(name = "bus_line_id")
    private BusLine busLine;

    /** Default constructor required by JPA. */
    public BusLineDateTime() {
    }

    /**
     * Constructs a new BusLineDateTime object with the specified ID, date, time, and associated bus line.
     *
     * @param id The ID of the bus line date and time.
     * @param date The date of the bus line.
     * @param time The time of the bus line.
     * @param busLine The associated bus line.
     */
    public BusLineDateTime(Long id, LocalDate date, LocalTime time, BusLine busLine) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.busLine = busLine;
    }

    /**
     * Retrieves the ID of the bus line date and time.
     * @return The ID of the bus line date and time.
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the ID of the bus line date and time.
     * @param id The ID to set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the date of the bus line.
     * @return The date of the bus line.
     */
    public LocalDate getDate() {
        return date;
    }

    /**
     * Sets the date of the bus line.
     * @param date The date to set.
     */
    public void setDate(LocalDate date) {
        this.date = date;
    }

    /**
     * Retrieves the time of the bus line.
     * @return The time of the bus line.
     */
    public LocalTime getTime() {
        return time;
    }

    /**
     * Sets the time of the bus line.
     * @param time The time to set.
     */
    public void setTime(LocalTime time) {
        this.time = time;
    }

    /**
     * Retrieves the bus line associated with this date and time.
     * @return The bus line associated with this date and time.
     */
    public BusLine getBusLine() {
        return busLine;
    }

    /**
     * Sets the bus line associated with this date and time.
     * @param busLine The bus line to set.
     */
    public void setBusLine(BusLine busLine) {
        this.busLine = busLine;
    }
}
