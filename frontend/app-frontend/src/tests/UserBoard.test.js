import { render, screen } from "@testing-library/react";
import HomePage from "../components/UserBoard";
import { BrowserRouter } from "react-router-dom";

describe("UserBoard Component", () => {
  test("renders UserBoard component", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const planningLink = screen.getByText(/planning/i);
    expect(planningLink).toHaveAttribute("href", "/plan");

    const reservationsLink = screen.getByText(/reservations/i);
    expect(reservationsLink).toHaveAttribute("href", "/reservations");

    const profileLink = screen.getByText(/profile/i);
    expect(profileLink).toHaveAttribute("href", "/profile");
  });
});
