/**
 * Test file for Register component.
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Register from "../components/Register";

/**
 * Mocking react-router-dom module.
 */
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

/**
 * Test suite for the Register component.
 */
describe("Register Component", () => {
  /**
   * Test to render the registration form.
   */
  test("renders the registration form", async () => {
    /**
     *  Render the component.
     */
    const { getByText, getByLabelText } = render(<Register />);

    /**
     * Wait for the form elements to be rendered.
     */
    await waitFor(() => {
      expect(getByText("Register")).toBeInTheDocument();
      expect(getByLabelText("Firstname")).toBeInTheDocument();
      expect(getByLabelText("Lastname")).toBeInTheDocument();
      expect(getByLabelText("Username")).toBeInTheDocument();
      expect(getByLabelText("Email")).toBeInTheDocument();
      expect(getByLabelText("Password")).toBeInTheDocument();
      expect(getByText("Create a user")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
    });
  });

  /**
   * Test to submit the form with valid data.
   */
  test("submits the form with valid data", async () => {
    /**
     * Mock function for registration.
     */
    const mockRegister = jest.fn().mockResolvedValue();

    /**
     * Render the component.
     */
    const { getByLabelText, getByText } = render(<Register />);

    /**
     * Fill out the form fields.
     */
    fireEvent.change(getByLabelText("Firstname"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Lastname"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    /**
     * Submit the form.
     */
    fireEvent.click(getByText("Create a user"));

    /**
     * Wait for registration to complete.
     */
    await mockRegister();

    /**
     * Assertion for the number of times register function is called.
     */
    expect(mockRegister).toHaveBeenCalledTimes(1);
  });
});
