import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import ReservationsTable from "../components/ReservationsTable";
import {
  deleteReservation,
  getAllReservations,
} from "../services/user.service";

jest.mock("../services/user.service", () => ({
  deleteReservation: jest.fn(),
  getAllReservations: jest.fn(),
}));

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

describe("ReservationsTable component", () => {
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

  test("renders reservation data and delete button", async () => {
    const onDeleteMessage = jest.fn();

    getAllReservations.mockResolvedValueOnce({ data: reservations });

    await act(async () => {
      const { getByText, getByTestId } = render(
        <ReservationsTable
          reservations={reservations}
          setReservations={jest.fn()}
          onDeleteMessage={onDeleteMessage}
        />
      );

      // Check if reservation data is rendered
      expect(getByText("Bus-Line")).toBeInTheDocument();
      expect(getByText("2024-02-24")).toBeInTheDocument();
      expect(getByText("08:00")).toBeInTheDocument();
      expect(getByText("1")).toBeInTheDocument();
      expect(getByText("1000 Ft")).toBeInTheDocument();
      expect(getByText("John Doe")).toBeInTheDocument();
      expect(getByText("johndoe")).toBeInTheDocument();

      // Check if delete button is rendered
      const deleteButton = getByTestId("delete-button-1");
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);
    });
  });

  /*   test("deletes reservation", async () => {
    const onDeleteMessage = jest.fn();
    const setReservations = jest.fn();

    getAllReservations.mockResolvedValueOnce({ data: reservations });

    const { getByTestId } = render(
      <ReservationsTable
        reservations={reservations}
        setReservations={setReservations}
        onDeleteMessage={onDeleteMessage}
      />
    );

    const deleteButton = getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    // Check if deleteReservation function is called
    await waitFor(() => {
      expect(deleteReservation).toHaveBeenCalledWith(1);
    });

    expect(setReservations).toHaveBeenCalledWith([]);

    expect(onDeleteMessage).toHaveBeenCalledWith(
      "Reservation successfully deleted!"
    );
  }); */
});
