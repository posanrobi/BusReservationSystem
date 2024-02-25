import { render } from "@testing-library/react";
import App from "../App";

jest.mock("../components/Root", () => () => <div>Root Component</div>);
jest.mock("../components/Auth", () => () => <div>Authentication Page</div>);
jest.mock("../components/UserBoard", () => () => (
  <div>User Board Component</div>
));
jest.mock("../pages/PlanningPage", () => () => <div>Planning Page</div>);
jest.mock("../pages/ProfilePage", () => () => <div>Profile Page</div>);
jest.mock("../pages/ReservationsPage", () => () => (
  <div>Reservations Page</div>
));
jest.mock("../components/AdminBoard", () => () => (
  <div>Admin Board Component</div>
));
jest.mock("../pages/ErrorPage", () => () => <div>Error Page</div>);

test("renders the landing page", () => {
  render(<App />);
});
