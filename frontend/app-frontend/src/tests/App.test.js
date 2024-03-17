/**
 * Test file for App component.
 */

import { render } from "@testing-library/react";
import App from "../App";

/**
 * Mocking components.
 */
jest.mock("../components/Root", () => () => <div>Root Component</div>);
jest.mock("../pages/Auth", () => () => <div>Authentication Page</div>);
jest.mock("../pages/UserBoard", () => () => <div>User Board Component</div>);
jest.mock("../pages/PlanningPage", () => () => <div>Planning Page</div>);
jest.mock("../pages/ProfilePage", () => () => <div>Profile Page</div>);
jest.mock("../pages/ReservationsPage", () => () => (
  <div>Reservations Page</div>
));
jest.mock("../pages/AdminBoard", () => () => <div>Admin Board Component</div>);
jest.mock("../pages/ErrorPage", () => () => <div>Error Page</div>);

/**
 * Test to render the landing page.
 */
test("renders the landing page", () => {
  /**
   * Render the component.
   */
  render(<App />);
});
