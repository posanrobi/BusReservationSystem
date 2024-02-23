import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import ReservationsPage from "../pages/ReservationsPage";
import {
  getAllReservations,
  deleteReservation,
} from "../services/user.service";
import { getCurrentUser } from "../services/auth.service";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterEach(() => {
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

jest.mock("../services/user.service", () => ({
  getAllReservations: jest.fn(),
  deleteReservation: jest.fn(),
}));
jest.mock("../services/auth.service", () => ({
  getCurrentUser: jest.fn(),
}));

describe("ReservationsPage Component", () => {
  test("renders the reservation page", async () => {
    const mockReservations = [];
    const currentUser = { username: "testuser" };

    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: mockReservations });

    let getByText;

    await act(async () => {
      const renderResult = render(
        <BrowserRouter>
          <ReservationsPage />
        </BrowserRouter>
      );
      getByText = renderResult.getByText;
    });
    expect(getByText("No reservations yet")).toBeInTheDocument();
  });
});
