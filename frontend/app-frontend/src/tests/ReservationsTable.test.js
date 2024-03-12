/**
 * Test file for ReservationsTable component.
 */

import React from "react";
import { render } from "@testing-library/react";
import ReservationsTable from "../components/ReservationsTable";
import { cleanup } from "@testing-library/react";

/**
 * Setting up modal root before each test.
 */
beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

/**
 * Removing modal root after each test.
 */
afterEach(() => {
  cleanup();
});

/**
 * Test suite for the ReservationsTable component.
 */
describe("ReservationsTable component", () => {
  /**
   * Sample reservations data for testing.
   */
  const reservations = [
    {
      id: 1,
      bus_line: "Bus-Line",
      reservation_date: "2024-02-24",
      reservation_time: "08:00:00",
      seat_number: "1",
      price: 1000,
      user: "John Doe",
      username: "johndoe",
    },
  ];

  /**
   * Test to render component without errors.
   */
  test("renders component without errors", () => {
    /**
     * Render the component with sample reservations data.
     */
    render(
      <ReservationsTable
        reservations={reservations}
        setReservations={jest.fn()}
        onDeleteMessage={jest.fn()}
      />
    );
  });
});
