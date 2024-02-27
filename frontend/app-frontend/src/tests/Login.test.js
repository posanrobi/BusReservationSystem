/**
 * Test file for Login component.
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/Login";

/**
 * Mocking react-router-dom module.
 */
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

/**
 * Test suite for Login Component.
 */
describe("Login Component", () => {
  /**
   * Test to render the login form.
   */
  test("renders the login form", () => {
    /**
     * Render the component.
     */
    const { getByText, getByLabelText } = render(<Login />);

    /**
     * Assertions for presence of login form elements.
     */
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Sign in")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  /**
   * Test to submit the form with valid credentials.
   */
  test("submits the form with valid credentials", async () => {
    /**
     * Mock function for login.
     */
    const mockLogin = jest.fn().mockResolvedValue();

    /**
     * Render the component.
     */
    const { getByLabelText, getByText } = render(<Login />);

    /**
     * Fill out the form fields.
     */
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    /**
     * Submit the form.
     */
    fireEvent.click(getByText("Sign in"));

    /**
     * Wait for login to complete.
     */
    await mockLogin();

    /**
     * Assertion for the number of times login function is called.
     */
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
