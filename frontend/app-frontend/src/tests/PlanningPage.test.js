/**
 * Test file for PlanningPage component.
 */

import React from "react";
import { render } from "@testing-library/react";
import PlanningPage from "../pages/PlanningPage";
import { BrowserRouter } from "react-router-dom";

/**
 * Setting up modal root before each test and mocking
 * showModal and close methods of HTMLDialogElement
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
 * Test suite for PlanningPage component.
 */
describe("PlanningPage Component", () => {
  /**
   * Test to ensure the component renders without crashing.
   */
  test("renders without crashing", () => {
    /**
     * Render the component.
     */
    render(
      <BrowserRouter>
        <PlanningPage />
      </BrowserRouter>
    );
  });
});
