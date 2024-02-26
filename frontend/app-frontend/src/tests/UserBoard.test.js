/**
 * Test file for UserBoard component.
 */

import { render, screen } from "@testing-library/react";
import HomePage from "../components/UserBoard";
import { BrowserRouter } from "react-router-dom";

/**
 * Tests for UserBoard component.
 */
describe("UserBoard Component", () => {
  /**
   * Test to render the component with the related links.
   */
  test("renders UserBoard component", () => {
    /**
     * Render the component.
     */
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    /**
     * Check if planning link, reservation link and profile link is rendered with correct href attribute.
     */
    const planningLink = screen.getByText(/planning/i);
    expect(planningLink).toHaveAttribute("href", "/plan");
    const reservationsLink = screen.getByText(/reservations/i);
    expect(reservationsLink).toHaveAttribute("href", "/reservations");
    const profileLink = screen.getByText(/profile/i);
    expect(profileLink).toHaveAttribute("href", "/profile");
  });
});
