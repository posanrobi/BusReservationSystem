/**
 * Test file for DetailsSelection component.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import DetailsSelection from "../components/DetailsSelection";

/**
 * Test suite for DetailsSelection component.
 */
describe("DetailsSelection component", () => {
  /**
   * Mock data for bus lines.
   */
  const mockBusLines = [
    { id: "1", price: 100 },
    { id: "2", price: 150 },
  ];

  /**
   * Mock function to get line ID.
   */
  const mockGetLineId = jest.fn((from, to) => {
    if (from === "A" && to === "B") return "1";
    if (from === "C" && to === "D") return "2";
    return null;
  });

  /**
   * Mock function to calculate total price.
   */
  const mockCalculateTotalPrice = jest.fn((selectedSeats, busLines) => {
    return (
      selectedSeats.length *
      (busLines.find((line) => line.id === "1").price || 0)
    );
  });

  /**
   * Mock selected seats array.
   */
  const mockSelectedSeats = [];

  /**
   * Test to render correct seat price and total price.
   */
  test("should render correct seat price and total price", () => {
    /**
     * Render the component.
     */
    render(
      <DetailsSelection
        busLines={mockBusLines}
        selectedFrom="A"
        selectedTo="B"
        getLineId={mockGetLineId}
        calculateTotalPrice={mockCalculateTotalPrice}
        selectedSeats={mockSelectedSeats}
      />
    );

    /**
     * Assertions for presence of seat price and total price.
     */
    expect(screen.getByText("Seat price:")).toBeInTheDocument();
    expect(screen.getByText("Total price:")).toBeInTheDocument();
  });
});
