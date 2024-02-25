import React from "react";
import { render } from "@testing-library/react";
import ReservationsTable from "../components/ReservationsTable";

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

  test("renders component without errors", () => {
    render(
      <ReservationsTable
        reservations={reservations}
        setReservations={jest.fn()}
        onDeleteMessage={jest.fn()}
      />
    );
  });
});
