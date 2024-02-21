import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ReservationsPage from "../pages/ReservationsPage";
import {
  getAllReservations,
  deleteReservation,
} from "../services/user.service";
import { getCurrentUser } from "../services/auth.service";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterAll(() => {
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

// Mocking dependencies
jest.mock("../services/user.service", () => ({
  getAllReservations: jest.fn(),
  deleteReservation: jest.fn(),
}));
jest.mock("../services/auth.service", () => ({
  getCurrentUser: jest.fn(),
}));

describe("ReservationsPage Component", () => {
  /*test("renders reservations for the current user", async () => {
    const currentUser = { username: "testuser" };
    const reservations = [
      {
        id: "1",
        bus_line: "Test-Line",
        reservation_date: "2024-02-18",
        reservation_time: "10:00",
        seat_number: "2",
        selected_seats: "1, 2",
        price: 1000,
      },
    ];

    // Mocking API responses
    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: reservations });

    const { getByText } = render(
      <BrowserRouter>
        <ReservationsPage />
      </BrowserRouter>
    );

    // Wait for reservations to be fetched
    await waitFor(() => {
      expect(getAllReservations).toHaveBeenCalledTimes(1);
      expect(getAllReservations).toHaveBeenCalledWith();
    });

    expect(getByText("Your reservations")).toBeInTheDocument();
    expect(getByText("Test-Line")).toBeInTheDocument();
    expect(getByText("2024-02-18")).toBeInTheDocument();
    expect(getByText("10:00")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("1, 2")).toBeInTheDocument();
    expect(getByText("1000 Ft")).toBeInTheDocument();
  }); */

  test("displays a message when there are no reservations", async () => {
    const currentUser = { username: "testuser" };

    // Mocking API responses
    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: [] });

    const { getByText } = render(
      <BrowserRouter>
        <ReservationsPage />
      </BrowserRouter>
    );

    // Wait for reservations to be fetched
    await waitFor(() => {
      expect(getAllReservations).toHaveBeenCalledTimes(1);
      expect(getAllReservations).toHaveBeenCalledWith();
    });

    expect(getByText("No reservations yet")).toBeInTheDocument();
  });

  /*   test("displays a success message after deleting a reservation", async () => {
    const currentUser = { username: "testuser" };
    const reservations = [
      {
        id: "1",
        bus_line: "Test Bus Line",
        reservation_date: "2024-02-18",
        reservation_time: "10:00",
        seat_number: "A1",
        selected_seats: "A1, A2",
        price: 1000,
      },
    ];

    // Mocking API responses
    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: reservations });

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <ReservationsPage />
      </BrowserRouter>
    );

    // Wait for reservations to be fetched
    await waitFor(() => {
      expect(getAllReservations).toHaveBeenCalledTimes(1);
      expect(getAllReservations).toHaveBeenCalledWith();
    });

    // Mocking delete confirmation
    fireEvent.click(getByTestId("delete-icon"));

    // Confirm deletion
    fireEvent.click(getByTestId("confirm-delete-btn"));

    // Wait for deletion to be processed
    await waitFor(() => {
      expect(deleteReservation).toHaveBeenCalledTimes(1);
      expect(deleteReservation).toHaveBeenCalledWith("1");
    });

    expect(getByText("Reservation deleted successfully!")).toBeInTheDocument();
  }); */
});
