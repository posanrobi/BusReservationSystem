import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserTable from "../components/UsersTable";

jest.mock("../services/user.service", () => ({
  deleteUser: jest.fn(),
  deleteReservation: jest.fn(),
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

describe("UserTable component", () => {
  const users = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "john@example.com",
      roles: [{ roleName: "ROLE_USER" }],
    },
  ];

  const reservations = [
    {
      id: 1,
      username: "johndoe",
    },
  ];

  test("renders user data and delete button", async () => {
    const onDeleteMessage = jest.fn();

    const { getByText, getByTestId } = render(
      <UserTable
        users={users}
        setUsers={jest.fn()}
        reservations={reservations}
        setReservations={jest.fn()}
        onDeleteMessage={onDeleteMessage}
      />
    );

    expect(getByText("John")).toBeInTheDocument();
    expect(getByText("Doe")).toBeInTheDocument();
    expect(getByText("johndoe")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();

    const deleteButton = getByTestId("delete-button-1");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
  });
});
