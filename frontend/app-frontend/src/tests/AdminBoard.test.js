/**
 * Test file for AdminBoard component.
 */

import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import AdminBoard from "../components/AdminBoard";
import { cleanup } from "@testing-library/react";

/**
 * Setup modal root before each test.
 */
beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

/**
 * Cleanup modal root after each test.
 */
afterEach(() => {
  cleanup();
});

/**
 * Test suite for AdminBoard component.
 */
describe("AdminBoard component", () => {
  /**
   * Test to render user and reservation tables.
   */
  test("renders user and reservation tables", async () => {
    /**
     * Render the component.
     */
    render(<AdminBoard />);

    /**
     * Wait for elements to be present in the DOM.
     */
    await waitFor(() => {
      expect(screen.getByText("User details")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Reservation details")).toBeInTheDocument();
    });
  });
});
