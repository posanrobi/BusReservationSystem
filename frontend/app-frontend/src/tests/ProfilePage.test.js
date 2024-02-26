/**
 * Test file for ProfilePage component.
 */

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
import { BrowserRouter } from "react-router-dom";

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
 * Test suite for ProfilePage component.
 */
describe("ProfilePage Component", () => {
  /**
   * Test to ensure input change is handled properly.
   */
  test("handles input change", async () => {
    /**
     * Render the component.
     */
    const { getByTestId } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    /**
     * Get the firstname input field.
     */
    const firstnameInput = getByTestId("profileFirstname");

    /**
     * Simulate input change.
     */
    act(() => {
      fireEvent.change(firstnameInput, { target: { value: "John" } });
    });

    /**
     * Wait for the change to reflect.
     */
    await waitFor(() => {
      expect(firstnameInput.value).toBe("John");
    });
  });
});
