import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import * as authService from "../services/auth.service";

jest.mock("../services/auth.service", () => ({
  logout: jest.fn(),
  getUserRole: jest.fn(),
}));

describe("MainNavigation component", () => {
  test("renders navigation links correctly for non-admin users", () => {
    authService.getUserRole.mockReturnValueOnce("ROLE_USER");

    const { getByText } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Plan")).toBeInTheDocument();
    expect(getByText("Reservations")).toBeInTheDocument();
    expect(getByText("Profile")).toBeInTheDocument();
  });

  test("does not render navigation links for admin users", () => {
    authService.getUserRole.mockReturnValueOnce("ROLE_ADMIN");

    const { queryByText } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    expect(queryByText("Home")).not.toBeInTheDocument();
    expect(queryByText("Plan")).not.toBeInTheDocument();
    expect(queryByText("Reservations")).not.toBeInTheDocument();
    expect(queryByText("Profile")).not.toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const logoutButton = getByTestId("logout-button");
    fireEvent.click(logoutButton);

    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
