/**
 * Test file for MainNavigation component.
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import * as authService from "../services/auth.service";

/**
 * Mocking authService methods.
 */
jest.mock("../services/auth.service", () => ({
  logout: jest.fn(),
  getUserRole: jest.fn(),
}));

/**
 * Test suite for MainNavigation component.
 */
describe("MainNavigation component", () => {
  /**
   * Test to render navigation links correctly for non-admin users.
   */
  test("renders navigation links correctly for non-admin users", () => {
    /**
     * Mocking user role.
     */
    authService.getUserRole.mockReturnValueOnce("ROLE_USER");

    /**
     * Render the component within MemoryRouter.
     */
    const { getByText } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    /**
     * Assertions for presence of navigation links.
     */
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Plan")).toBeInTheDocument();
    expect(getByText("Reservations")).toBeInTheDocument();
    expect(getByText("Profile")).toBeInTheDocument();
  });

  /**
   * Test to ensure navigation links are not rendered for admin users.
   */
  test("does not render navigation links for admin users", () => {
    /**
     * Mocking user role.
     */
    authService.getUserRole.mockReturnValueOnce("ROLE_ADMIN");

    /**
     * Render the component within MemoryRouter.
     */
    const { queryByText } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    /**
     * Assertions for absence of navigation links.
     */
    expect(queryByText("Home")).not.toBeInTheDocument();
    expect(queryByText("Plan")).not.toBeInTheDocument();
    expect(queryByText("Reservations")).not.toBeInTheDocument();
    expect(queryByText("Profile")).not.toBeInTheDocument();
  });

  /**
   * Test to verify that the logout function is called when logout button is clicked.
   */
  test("calls logout function when logout button is clicked", () => {
    /**
     * Render the component within MemoryRouter.
     */
    const { getByTestId } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    /**
     * Click the logout button.
     */
    const logoutButton = getByTestId("logout-button");
    fireEvent.click(logoutButton);

    /**
     * Assertion for the number of times logout function is called.
     */
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
