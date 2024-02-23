import React from "react";
import { render } from "@testing-library/react";
import DetailsSelection from "../components/DetailsSelection";

describe("DetailsSelection component", () => {
  const mockBusLines = [
    { id: "1", price: 100 },
    { id: "2", price: 150 },
  ];

  const mockGetLineId = jest.fn((from, to) => {
    if (from === "A" && to === "B") return "1";
    if (from === "C" && to === "D") return "2";
    return null;
  });

  const mockCalculateTotalPrice = jest.fn((selectedSeats, busLines) => {
    return (
      selectedSeats.length *
      (busLines.find((line) => line.id === "1").price || 0)
    );
  });

  const mockSelectedSeats = [];

  test("should render correct seat price and total price", () => {
    const { getByText } = render(
      <DetailsSelection
        busLines={mockBusLines}
        selectedFrom="A"
        selectedTo="B"
        getLineId={mockGetLineId}
        calculateTotalPrice={mockCalculateTotalPrice}
        selectedSeats={mockSelectedSeats}
      />
    );

    expect(getByText("Seat price:")).toBeInTheDocument();
    expect(getByText("Total price:")).toBeInTheDocument();
  });
});
