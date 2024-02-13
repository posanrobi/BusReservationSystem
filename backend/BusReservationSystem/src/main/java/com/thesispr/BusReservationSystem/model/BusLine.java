package com.thesispr.BusReservationSystem.model;

import jakarta.persistence.*;

/**
 * Entity class representing a bus line.
 * Annotated with @Entity to indicate that instances of this class are JPA entities.
 */
@Entity
public class BusLine {
    /**
     * Unique identifier for the bus line.
     * Annotated with @Id to specify the primary key of the entity.
     * Annotated with @GeneratedValue to indicate that the ID is automatically generated.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the bus line. */
    private String name;

    /** Price of the bus line. */
    private int price;

    /**
     * Retrieves the ID of the bus line.
     * @return The ID of the bus line.
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the ID of the bus line.
     * @param id The ID to set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the name of the bus line.
     * @return The name of the bus line.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the bus line.
     * @param name The name to set.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retrieves the price of the bus line.
     * @return The price of the bus line.
     */
    public int getPrice() {
        return price;
    }

    /**
     * Sets the price of the bus line.
     * @param price The price to set.
     */
    public void setPrice(int price) {
        this.price = price;
    }
}
