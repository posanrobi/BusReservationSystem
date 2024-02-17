import { render, screen } from "@testing-library/react";
import HomePage from "./components/UserBoard";
import { BrowserRouter } from "react-router-dom";

describe("UserBoard Component", () => {
  test("renders UserBoard component", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    //expect(screen.getByText(/Bookerra/i)).toBeInTheDocument();
    //expect(screen.getByText(/Hungary/i)).toBeInTheDocument();
  });
});
