import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthenticationPage from "../components/Auth";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  const loginModal = document.createElement("div");
  loginModal.setAttribute("data-testid", "login-modal");
  modalRoot.appendChild(loginModal);

  const registerModal = document.createElement("div");
  registerModal.setAttribute("data-testid", "register-modal");
  modalRoot.appendChild(registerModal);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterEach(() => {
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("AuthenticationPage component", () => {
  test("renders component without errors", () => {
    render(
      <BrowserRouter>
        <AuthenticationPage />
      </BrowserRouter>
    );
  });

  test("opens login modal when sign in button is clicked", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthenticationPage />
      </BrowserRouter>
    );

    const signInButton = getByTestId("sign-in-button");
    fireEvent.click(signInButton);

    await waitFor(() => {
      const loginModal = getByTestId("login-modal");
      expect(loginModal).toBeInTheDocument();
    });
  });

  test("opens register modal when sign up button is clicked", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthenticationPage />
      </BrowserRouter>
    );

    const signUpButton = getByTestId("sign-up-button");
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const registerModal = getByTestId("register-modal");
      expect(registerModal).toBeInTheDocument();
    });
  });
});
