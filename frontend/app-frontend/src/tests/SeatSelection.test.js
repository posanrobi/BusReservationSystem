/**
 * Test file for SeatSelection component.
 */

import React from "react";
import { render } from "@testing-library/react";
import SeatSelection from "../components/SeatSelection";

/**
 * Test suite for the SeatSelection component.
 */
describe("SeatSelection component", () => {
  /**
   * Mock data for testing.
   */
  const mockGroupedDatesByLineId = {
    lineId1: [{ busLine: { name: "From A - To B" } }],
    lineId2: [{ busLine: { name: "From C - To D" } }],
  };

  /**
   * Mock function to get line ID.
   */
  const mockGetLineId = jest.fn((from, to) => {
    if (from === "A" && to === "B") return "lineId1";
    if (from === "C" && to === "D") return "lineId2";
    return null;
  });

  /**
   * Mock function to render seats.
   */
  const mockRenderSeats = jest.fn();

  /**
   * Test to check rendering of "No seats available" message when no selected time.
   */
  test('should render "No seats available" message when no selected time', () => {
    /**
     * Render the component.
     */
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

    /**
     * Assertion for "No seats available" message.
     */
    expect(getByText("No seats available")).toBeInTheDocument();
  });

  /**
   * Test to check rendering of seats when there is a selected time.
   */
  test("should render seats when there is a selected time", () => {
    /**
     * Render the component.
     */
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

    /**
     * Assertion for presence of seats container.
     */
    expect(container.querySelector(".seats")).toBeInTheDocument();
  });
});
