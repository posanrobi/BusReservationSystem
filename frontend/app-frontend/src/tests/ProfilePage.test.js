import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
import { BrowserRouter } from "react-router-dom";

/* --- */
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
/* --- */

describe("ProfilePage Component", () => {
  test("renders input fields and buttons", () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    expect(getByLabelText("Firstname")).toBeInTheDocument();
    expect(getByLabelText("Lastname")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Current password")).toBeInTheDocument();
    expect(getByLabelText("New password")).toBeInTheDocument();
    expect(getByLabelText("Confirm new password")).toBeInTheDocument();

    expect(getByText("Save changes")).toBeInTheDocument();
  });

  test("handles input change", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    const firstnameInput = getByLabelText("Firstname");
    fireEvent.change(firstnameInput, { target: { value: "John" } });
    expect(firstnameInput.value).toBe("John");
  });

  test("validates email format", () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    expect(getByText("invalid email format")).toBeInTheDocument();
  });

  test("toggles edit mode", () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    const editButton = getByText("Edit");
    fireEvent.click(editButton);

    const usernameInput = getByLabelText("Username");
    expect(usernameInput).toBeEnabled();
  });
});
