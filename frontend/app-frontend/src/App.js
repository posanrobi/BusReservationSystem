import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Root";
import AuthenticationPage from "./pages/Auth";
import HomePage from "./pages/UserBoard";
import PlanningPage from "./pages/PlanningPage";
import ProfilePage from "./pages/ProfilePage";
import ReservationsPage from "./pages/ReservationsPage";
import AdminBoard from "./pages/AdminBoard";
import Error from "./pages/ErrorPage";
import { checkAuthLoader } from "./services/auth.service";

/**
 *  Create a browser router instance with specified routes.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationPage />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "home", element: <HomePage />, loader: checkAuthLoader },
      { path: "plan", element: <PlanningPage />, loader: checkAuthLoader },
      { path: "profile", element: <ProfilePage />, loader: checkAuthLoader },
      {
        path: "reservations",
        element: <ReservationsPage />,
        loader: checkAuthLoader,
      },
      { path: "admin", element: <AdminBoard />, loader: checkAuthLoader },
    ],
  },
  { path: "*", element: <Error /> },
]);

/**
 * App component serves as the entry point of the application.
 * It configures the router with specified routes and renders the RouterProvider with the router instance.
 * @returns {React.JSX.Element} JSX element representing the App component.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
