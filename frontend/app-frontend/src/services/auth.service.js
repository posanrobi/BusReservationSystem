import axios from "axios";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

const AUTH_API_URL = "http://localhost:8080/api/auth/";

//login
export async function login(formData) {
  try {
    const response = await axios.post(AUTH_API_URL + "signin", formData);
    const { accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  } catch (error) {
    throw error;
  }
}

//register
export async function register(formData) {
  try {
    const response = await axios.post(AUTH_API_URL + "signup", formData);
    return response;
  } catch (error) {
    throw error;
  }
}

//logout
export function logout() {
  localStorage.removeItem("user");
}

//current user
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
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
