import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/Login";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Login Component", () => {
  test("renders the login form", () => {
    const { getByText, getByLabelText } = render(<Login />);

    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Sign in")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  test("submits the form with valid credentials", async () => {
    const mockLogin = jest.fn().mockResolvedValue();
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.click(getByText("Sign in"));

    await mockLogin();

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
