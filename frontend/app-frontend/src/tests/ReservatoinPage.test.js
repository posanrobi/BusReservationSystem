/**
 * Test file for ReservationPage component.
 */

import React from "react";
import { render, act } from "@testing-library/react";
import ReservationsPage from "../pages/ReservationsPage";
import { getAllReservations } from "../services/user.service";
import { getCurrentUser } from "../services/auth.service";
import { BrowserRouter } from "react-router-dom";

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
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

/**
 * Mocking user.service and auth.service modules.
 */
jest.mock("../services/user.service", () => ({
  getAllReservations: jest.fn(),
  deleteReservation: jest.fn(),
}));
jest.mock("../services/auth.service", () => ({
  getCurrentUser: jest.fn(),
}));

/**
 * Test suite for the ReservationsPage component.
 */
describe("ReservationsPage Component", () => {
  /**
   * Test to render the reservation page.
   */
  test("renders the reservation page", async () => {
    /**
     * Mock data and function calls.
     */
    const mockReservations = [];
    const currentUser = { username: "testuser" };
    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: mockReservations });

    let getByText;

    /**
     * Rendering the component within act to handle asynchronous behavior.
     */
    await act(async () => {
      const renderResult = render(
        <BrowserRouter>
          <ReservationsPage />
        </BrowserRouter>
      );
      getByText = renderResult.getByText;
    });

    /**
     * Assertion for the presence of "No reservations yet" message.
     */
    expect(getByText("No reservations yet")).toBeInTheDocument();
  });
});
