import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SeatSelection from "../components/SeatSelection";

describe("SeatSelection component", () => {
  const mockGroupedDatesByLineId = {
    lineId1: [{ busLine: { name: "From A - To B" } }],
    lineId2: [{ busLine: { name: "From C - To D" } }],
  };

  const mockGetLineId = jest.fn((from, to) => {
    if (from === "A" && to === "B") return "lineId1";
    if (from === "C" && to === "D") return "lineId2";
    return null;
  });

  const mockRenderSeats = jest.fn();

  it('should render "No seats available" message when no selected time', () => {
    const { getByText } = render(
      <SeatSelection
        selectedFrom="A"
        selectedTo="B"
        selectedDate="2024-02-23"
        selectedTime=""
        groupedDatesByLineId={mockGroupedDatesByLineId}
        getLineId={mockGetLineId}
        handleClearSelectedSeats={() => {}}
        renderSeats={mockRenderSeats}
      />
    );

    expect(getByText("No seats available")).toBeInTheDocument();
  });

  it("should render seats when there is a selected time", () => {
    const { container } = render(
      <SeatSelection
        selectedFrom="C"
        selectedTo="D"
        selectedDate="2024-02-23"
        selectedTime="10:00 AM"
        groupedDatesByLineId={mockGroupedDatesByLineId}
        getLineId={mockGetLineId}
        handleClearSelectedSeats={() => {}}
        renderSeats={mockRenderSeats}
      />
    );

    expect(container.querySelector(".seats")).toBeInTheDocument();
  });
});
