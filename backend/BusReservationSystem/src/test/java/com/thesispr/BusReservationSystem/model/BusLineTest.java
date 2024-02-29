package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for the BusLine class.
 */
public class BusLineTest {

    /**
     * Test for the no-argument constructor.
     */
    @Test
    public void testNoArgConstructor() {
        /* Arrange: Create a new instance of BusLine */
        BusLine busLine = new BusLine();

        /* Assert: Verify that the instance is not null */
        assertThat(busLine).isNotNull();
    }

    /**
     * Test for the all-argument constructor.
     */
    @Test
    public void testAllArgConstructor() {
        /* Arrange: Set up values for constructor arguments */
        Long id = 1L;
        String name = "TestBusLine";
        int price = 2000;

        /* Act: Create a new instance of BusLine */
        BusLine busLine = new BusLine(id, name, price);

        /* Assert: Verify that the instance and its properties are set correctly */
        assertThat(busLine).isNotNull();
        assertThat(busLine.getId()).isEqualTo(id);
        assertThat(busLine.getName()).isEqualTo(name);
        assertThat(busLine.getPrice()).isEqualTo(price);
    }

    /**
     * Test for getters and setters.
     */
    @Test
    public void testGettersAndSetters() {
        /* Arrange: Set up values for constructor arguments */
        Long id = 1L;
        String name = "TestBusLine";
        int price = 2000;

        /* Act: Create a new instance of BusLine */
        BusLine busLine = new BusLine();

        /* Set the properties using setters */
        busLine.setId(id);
        busLine.setName(name);
        busLine.setPrice(price);

        /* Assert: Verify that the properties are set correctly */
        assertThat(busLine).isNotNull();
        assertThat(busLine.getId()).isEqualTo(id);
        assertThat(busLine.getName()).isEqualTo(name);
        assertThat(busLine.getPrice()).isEqualTo(price);
    }
}
