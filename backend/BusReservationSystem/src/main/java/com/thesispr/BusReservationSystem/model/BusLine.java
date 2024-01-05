package com.thesispr.BusReservationSystem.model;

import jakarta.persistence.*;

import java.util.ArrayList;

import java.util.List;

@Entity
public class BusLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "busLine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BusLineDate> available_dates = new ArrayList<>();
    private int seat_num;
    private int price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BusLineDate> getAvailable_dates() {
        return available_dates;
    }

    public void setAvailable_dates(List<BusLineDate> available_dates) {
        this.available_dates = available_dates;
    }

    public int getSeat_num() {
        return seat_num;
    }

    public void setSeat_num(int seat_num) {
        this.seat_num = seat_num;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
