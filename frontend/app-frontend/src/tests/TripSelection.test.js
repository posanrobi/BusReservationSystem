/**
 * Test file for TripSelection component.
 */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TripSelection from "../components/TripSelection";

/**
 * Test suite for the TripSelection component.
 */
describe("TripSelection Component", () => {
  /**
   * Mock data for testing.
   */
  const mockBusLines = [
    { id: 1, name: "CityA - CityB" },
    { id: 2, name: "CityA - CityC" },
  ];

  const mockGroupedDatesByLineId = {
    1: [{ date: "2024-02-24" }, { date: "2024-02-25" }],
    2: [{ date: "2024-02-24" }, { date: "2024-02-26" }],
  };

  const mockGroupedTimesByLineId = {
    1: ["08:00", "10:00", "12:00"],
    2: ["09:00", "11:00", "13:00"],
  };

  const mockFunctions = {
    handleSelectFromChange: jest.fn(),
    handleSelectToChange: jest.fn(),
    handleSelectDateChange: jest.fn(),
    handleSelectTimeChange: jest.fn(),
    getLineId: jest.fn(),
  };

  /**
   * Test to check if component renders without errors.
   */
  test("renders TripSelection component correctly", () => {
    /**
     * Render the component.
     */
    render(
      <TripSelection
        busLines={mockBusLines}
        selectedFrom=""
        selectedTo=""
        selectedDate=""
        selectedTime=""
        {...mockFunctions}
        groupedDatesByLineId={mockGroupedDatesByLineId}
        groupedTimesByLineId={mockGroupedTimesByLineId}
      />
    );

    /**
     * Assertions for rendered elements.
     */
    expect(screen.getByText("Plan your travel")).toBeInTheDocument();
    expect(screen.getByLabelText("From:")).toBeInTheDocument();
    expect(screen.getByLabelText("To:")).toBeInTheDocument();
    expect(screen.getByLabelText("Available dates:")).toBeInTheDocument();
    expect(screen.getByLabelText("Available times:")).toBeInTheDocument();
  });

  /**
   * Test to ensure change events are handled correctly.
   */
  test("handles change events correctly", () => {
    /**
     * Render the component.
     */
    render(
      <TripSelection
        busLines={mockBusLines}
        selectedFrom=""
        selectedTo=""
        selectedDate=""
        selectedTime=""
        {...mockFunctions}
        groupedDatesByLineId={mockGroupedDatesByLineId}
        groupedTimesByLineId={mockGroupedTimesByLineId}
      />
    );

    /**
     * Simulate change events.
     */
    fireEvent.change(screen.getByLabelText("From:"), { target: { value: "CityA" } });
    fireEvent.change(screen.getByLabelText("To:"), { target: { value: "CityB" } });
    fireEvent.change(screen.getByLabelText("Available dates:"), {
      target: { value: "2024-02-24" },
    });
    fireEvent.change(screen.getByLabelText("Available times:"), {
      target: { value: "08:00" },
    });

    /**
     * Assertions for function calls.
     */
    expect(mockFunctions.handleSelectFromChange).toHaveBeenCalled();
    expect(mockFunctions.handleSelectToChange).toHaveBeenCalled();
    expect(mockFunctions.handleSelectDateChange).toHaveBeenCalled();
    expect(mockFunctions.handleSelectTimeChange).toHaveBeenCalled();
  });
});
