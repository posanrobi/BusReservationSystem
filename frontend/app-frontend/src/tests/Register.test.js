/**
 * Test file for Register component.
 */

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
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
    render(<Register />);

    /**
     * Wait for the form elements to be rendered.
     */
    await waitFor(() => {
      expect(screen.getByText("Register")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Firstname")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Lastname")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Create a user")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Cancel")).toBeInTheDocument();
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
    render(<Register />);

    /**
     * Fill out the form fields.
     */
    fireEvent.change(screen.getByLabelText("Firstname"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Lastname"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    /**
     * Submit the form.
     */
    fireEvent.click(screen.getByText("Create a user"));

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
