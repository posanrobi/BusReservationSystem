/**
 * Test file for AuthenticationPage component.
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthenticationPage from "../components/Auth";
import { BrowserRouter } from "react-router-dom";

/**
 * Setup modal root before each test.
 */
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

/**
 * Cleanup modal root after each test.
 */
afterEach(() => {
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

/**
 * Test suite for AuthenticationPage component.
 */
describe("AuthenticationPage component", () => {
  /**
   * Test to render component without errors.
   */
  test("renders component without errors", () => {
    /**
     * Render the component and assert it renders without errors.
     */
    render(
      <BrowserRouter>
        <AuthenticationPage />
      </BrowserRouter>
    );
  });

  /**
   * Test to open login modal when sign in button is clicked.
   */
  test("opens login modal when sign in button is clicked", async () => {
    /**
     * Render the component.
     */
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthenticationPage />
      </BrowserRouter>
    );

    /**
     * Click sign in button.
     */
    const signInButton = getByTestId("sign-in-button");
    fireEvent.click(signInButton);

    /**
     * Wait for login modal to be displayed.
     */
    await waitFor(() => {
      const loginModal = getByTestId("login-modal");
      expect(loginModal).toBeInTheDocument();
    });
  });

  /**
   * Test to open register modal when sign up button is clicked.
   */
  test("opens register modal when sign up button is clicked", async () => {
    /**
     * Render the component.
     */
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthenticationPage />
      </BrowserRouter>
    );

    /**
     * Click sign up button.
     */
    const signUpButton = getByTestId("sign-up-button");
    fireEvent.click(signUpButton);

    /**
     * Wait for register modal to be displayed.
     */
    await waitFor(() => {
      const registerModal = getByTestId("register-modal");
      expect(registerModal).toBeInTheDocument();
    });
  });
});
