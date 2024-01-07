import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Root";
import AuthenticationPage from "./components/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/UserBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <AuthenticationPage /> },
      { path: "signin", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "home", element: <HomePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
