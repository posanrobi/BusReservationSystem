/**
 * Test file for MainNavigation component.
 */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    /**
     * Assertions for presence of navigation links.
     */
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
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
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    /**
     * Assertions for absence of navigation links.
     */
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Plan")).not.toBeInTheDocument();
    expect(screen.queryByText("Reservations")).not.toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  /**
   * Test to verify that the logout function is called when logout button is clicked.
   */
  test("calls logout function when logout button is clicked", () => {
    /**
     * Render the component within MemoryRouter.
     */
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    /**
     * Click the logout button.
     */
    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    /**
     * Assertion for the number of times logout function is called.
     */
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
