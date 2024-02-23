import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TripSelection from "../components/TripSelection";

describe("TripSelection Component", () => {
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

  test("renders TripSelection component correctly", () => {
    const { getByText, getByLabelText } = render(
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

    expect(getByText("Plan your travel")).toBeInTheDocument();
    expect(getByLabelText("From:")).toBeInTheDocument();
    expect(getByLabelText("To:")).toBeInTheDocument();
    expect(getByLabelText("Available dates:")).toBeInTheDocument();
    expect(getByLabelText("Available times:")).toBeInTheDocument();
  });

  test("handles change events correctly", () => {
    const { getByLabelText } = render(
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

    fireEvent.change(getByLabelText("From:"), { target: { value: "CityA" } });
    fireEvent.change(getByLabelText("To:"), { target: { value: "CityB" } });
    fireEvent.change(getByLabelText("Available dates:"), {
      target: { value: "2024-02-24" },
    });
    fireEvent.change(getByLabelText("Available times:"), {
      target: { value: "08:00" },
    });

    expect(mockFunctions.handleSelectFromChange).toHaveBeenCalled();
    expect(mockFunctions.handleSelectToChange).toHaveBeenCalled();
    expect(mockFunctions.handleSelectDateChange).toHaveBeenCalled();
    expect(mockFunctions.handleSelectTimeChange).toHaveBeenCalled();
  });
});
