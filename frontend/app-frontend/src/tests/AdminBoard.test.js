import React from "react";
import { render, waitFor } from "@testing-library/react";
import AdminBoard from "../components/AdminBoard";

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

describe("AdminBoard component", () => {
  test("renders user and reservation tables", async () => {
    const { getByText } = render(<AdminBoard />);

    await waitFor(() => {
      expect(getByText("User details")).toBeInTheDocument();
      expect(getByText("Reservation details")).toBeInTheDocument();
    });
  });
});
