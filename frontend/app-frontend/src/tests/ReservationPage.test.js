import React from "react";
import { render } from "@testing-library/react";
import ReservationsPage from "../pages/ReservationsPage";
import { getAllReservations } from "../services/user.service";
import { getCurrentUser } from "../services/auth.service";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";

beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterAll(() => {
  cleanup();
});

jest.mock("../services/user.service", () => ({
  getAllReservations: jest.fn(),
}));
jest.mock("../services/auth.service", () => ({
  getCurrentUser: jest.fn(),
}));

describe("ReservationsPage Component", () => {
  test("renders the reservation page", () => {
    const mockReservations = [];
    const currentUser = { username: "testuser" };

    getCurrentUser.mockReturnValue(currentUser);
    getAllReservations.mockResolvedValue({ data: mockReservations });

    render(
      <BrowserRouter>
        <ReservationsPage />
      </BrowserRouter>
    );
  });
});
