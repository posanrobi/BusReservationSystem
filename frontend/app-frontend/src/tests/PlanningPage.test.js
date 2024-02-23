import React from "react";
import { render } from "@testing-library/react";
import PlanningPage from "../pages/PlanningPage";
import { BrowserRouter } from "react-router-dom";

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

describe("PlanningPage Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <PlanningPage />
      </BrowserRouter>
    );
  });
});
