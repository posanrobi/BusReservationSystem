import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Root";
import AuthenticationPage from "./components/Auth";
import HomePage from "./components/UserBoard";
import PlanningPage from "./pages/PlanningPage";
import ProfilePage from "./pages/ProfilePage";
import ReservationsPage from "./pages/ReservationsPage";
import AdminBoard from "./components/AdminBoard";
import { checkAuthLoader } from "./services/auth.service";
import Error from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationPage />,
    errorElement: <Error />,
  },
  /* { path: "signin", element: <Login /> },
  { path: "signup", element: <Register /> }, */
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
