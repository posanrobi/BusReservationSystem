import axios from "axios";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth/";

//login
export async function login(formData) {
  const response = await axios.post(API_URL + "signin", formData);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
}

//register
export async function register(formData) {
  const response = await axios.post(API_URL + "signup", formData);
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

//loaded token
/* export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  }
  return null;
} */

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
