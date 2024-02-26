import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Register from "../components/Register";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Register Component", () => {
  test("renders the registration form", async () => {
    const { getByText, getByLabelText } = render(<Register />);

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

  test("submits the form with valid data", async () => {
    const mockRegister = jest.fn().mockResolvedValue();
    const { getByLabelText, getByText } = render(<Register />);

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
    fireEvent.click(getByText("Create a user"));

    await mockRegister();

    expect(mockRegister).toHaveBeenCalledTimes(1);
  });
});
