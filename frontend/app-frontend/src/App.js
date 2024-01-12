import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Root";
import AuthenticationPage from "./components/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/UserBoard";
import PlanningPage from "./pages/PlanningPage";
import ProfilePage from "./pages/ProfilePage";
import ReservationsPage from "./pages/ReservationsPage";
import AdminBoard from "./components/AdminBoard";

const router = createBrowserRouter([
  { path: "/", element: <AuthenticationPage /> },
  { path: "signin", element: <Login /> },
  { path: "signup", element: <Register /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "plan", element: <PlanningPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "reservations", element: <ReservationsPage /> },
      { path: "admin", element: <AdminBoard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
