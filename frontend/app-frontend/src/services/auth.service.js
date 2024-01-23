import axios from "axios";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import authHeader from "./auth-header";

const AUTH_API_URL = "http://localhost:8080/api/auth/";
const BUS_LINE_API_URL = "http://localhost:8080/api/bus-lines/";
const RESERVATION_API_URL = "http://localhost:8080/api/reservations";

//login
export async function login(formData) {
  const response = await axios.post(AUTH_API_URL + "signin", formData);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
}

//register
export async function register(formData) {
  const response = await axios.post(AUTH_API_URL + "signup", formData);
  return response;
}

//logout
export function logout() {
  localStorage.removeItem("user");
}

//current user
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

//reservation data
export async function createReservation(reservationData) {
  const response = await axios.post(RESERVATION_API_URL, reservationData, {
    headers: authHeader(),
  });
  return response;
}

//user role
export function getUserRole() {
  const user = getCurrentUser();
  return user ? user.roles[0] : null;
}

//token
export function getAuthToken() {
  const currentUser = getCurrentUser();
  const token = currentUser ? currentUser.accessToken : null;
  return token;
}

//enter submit
export function useEnterKeyEffect(handleSubmit) {
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit(event);
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSubmit]);
}

//loaded token
/* export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  }
  return null;
} */

//protect routes
export function checkAuthLoader() {
  const token = getAuthToken();
  const userRole = getUserRole();
  const url = window.location.href;

  if (!token) {
    return redirect("/");
  } else if (userRole === "ROLE_USER" && url.includes("/admin")) {
    return redirect("/error");
  } else if (
    userRole === "ROLE_ADMIN" &&
    (url.includes("/home") ||
      url.includes("/reservations") ||
      url.includes("/plan") ||
      url.includes("/profile"))
  ) {
    return redirect("/error");
  }

  return null;
}
