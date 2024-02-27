package com.thesispr.BusReservationSystem.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BusLineTest {

    @Test
    public void testNoArgConstructor() {
        BusLine busLine = new BusLine();
        assertThat(busLine).isNotNull();
    }

    @Test
    public void testAllArgConstructor() {
        Long id = 1L;
        String name = "TestBusLine";
        int price = 2000;

        BusLine busLine = new BusLine(id, name, price);

        assertThat(busLine).isNotNull();
        assertThat(busLine.getId()).isEqualTo(id);
        assertThat(busLine.getName()).isEqualTo(name);
        assertThat(busLine.getPrice()).isEqualTo(price);
    }

    @Test
    public void testGettersAndSetters() {
        Long id = 1L;
        String name = "TestBusLine";
        int price = 2000;

        BusLine busLine = new BusLine();
        busLine.setId(id);
        busLine.setName(name);
        busLine.setPrice(price);

        assertThat(busLine).isNotNull();
        assertThat(busLine.getId()).isEqualTo(id);
        assertThat(busLine.getName()).isEqualTo(name);
        assertThat(busLine.getPrice()).isEqualTo(price);
    }
}
