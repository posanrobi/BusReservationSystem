import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
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

describe("ProfilePage Component", () => {
  test("renders input fields and buttons", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByLabelText("Firstname")).toBeInTheDocument();
      expect(getByLabelText("Lastname")).toBeInTheDocument();
      expect(getByLabelText("Username")).toBeInTheDocument();
      expect(getByLabelText("Email")).toBeInTheDocument();
      expect(getByLabelText("Current password")).toBeInTheDocument();
      expect(getByLabelText("New password")).toBeInTheDocument();
      expect(getByLabelText("Confirm new password")).toBeInTheDocument();
      expect(getByText("Save changes")).toBeInTheDocument();
    });
  });

  /*   test("handles input change", async () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    const firstnameInput = getByLabelText("Firstname");

    act(() => {
      fireEvent.change(firstnameInput, { target: { value: "John" } });
    });

    await waitFor(() => {
      expect(firstnameInput.value).toBe("John");
    });
  }); */
  /* 
  test("toggles edit mode", async () => {
    act(() => {
      const { getByTestId, getByLabelText } = render(
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      );
      const editButton = getByTestId("edit-icon");
      const usernameInput = getByLabelText("Username");

      fireEvent.click(editButton);
    });

    //await waitFor(() => {
    expect(usernameInput).toBeEnabled();
    //});
  }); */

  /*   test("validates email format", async () => {
    const { getByLabelText, container } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
  
    const emailInput = getByLabelText("Email");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    });
  
    await waitFor(
      () => {
        expect(container.querySelector(".error")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  }); */
});
