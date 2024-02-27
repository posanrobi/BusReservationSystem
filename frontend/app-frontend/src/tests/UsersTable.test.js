/**
 * Test file for UserTable component.
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserTable from "../components/UsersTable";

/**
 * Mocking user.service module.
 */
jest.mock("../services/user.service", () => ({
  deleteUser: jest.fn(),
  deleteReservation: jest.fn(),
}));

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
 * Test suite for UserTable component.
 */
describe("UserTable component", () => {
  /**
   * Sample user data for testing.
   */
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

  /**
   * Sample reservations data for testing.
   */
  const reservations = [
    {
      id: 1,
      username: "johndoe",
    },
  ];

  /**
   *  Test to ensure user data and delete button are rendered properly.
   */
  test("renders user data and delete button", async () => {
    /**
     * Mock function for onDeleteMessage.
     */
    const onDeleteMessage = jest.fn();

    /**
     * Rendering UserTable component with sample data and mock functions.
     */
    const { getByText, getByTestId } = render(
      <UserTable
        users={users}
        setUsers={jest.fn()}
        reservations={reservations}
        setReservations={jest.fn()}
        onDeleteMessage={onDeleteMessage}
      />
    );

    /**
     * Asserting that user data is rendered properly.
     */
    expect(getByText("John")).toBeInTheDocument();
    expect(getByText("Doe")).toBeInTheDocument();
    expect(getByText("johndoe")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();

    /**
     * Getting delete button and asserting its presence.
     */
    const deleteButton = getByTestId("delete-button-1");
    expect(deleteButton).toBeInTheDocument();

    /**
     * Simulating click event on delete button.
     */
    fireEvent.click(deleteButton);
  });
});
