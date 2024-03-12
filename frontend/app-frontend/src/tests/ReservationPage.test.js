/**
 * Test file for ReservationPage component.
 */

import React from "react";
import { render } from "@testing-library/react";
import ReservationsPage from "../pages/ReservationsPage";
import { getAllReservations } from "../services/user.service";
import { getCurrentUser } from "../services/auth.service";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";

/**
 * Setting up modal root before all tests and mocking
 * showModal and close methods of HTMLDialogElement
 */
beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

/**
 * Cleaning up the DOM after all tests.
 */
afterAll(() => {
  cleanup();
});

/**
 * Test to ensure reservation and user data is passed as prop.
 */
jest.mock("../services/user.service", () => ({
  getAllReservations: jest.fn(),
}));

jest.mock("../services/auth.service", () => ({
  getCurrentUser: jest.fn(),
}));

/**
 * Test suite for ReservationPage component.
 */
describe("ReservationsPage Component", () => {
  /**
   * Test to render component without errors.
   */
  test("renders the reservation page", () => {
    const mockReservations = [];
    const currentUser = { username: "testuser" };

    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: mockReservations });

    /**
     * Render the component.
     */
    render(
      <BrowserRouter>
        <ReservationsPage />
      </BrowserRouter>
    );
  });
});
