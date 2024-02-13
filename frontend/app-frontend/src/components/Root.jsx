import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

/**
 * RootLayout component serves as the main layout for the application, rendering the main navigation and the content of the current route.
 * @returns {React.JSX.Element} The RootLayout component.
 */
export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
