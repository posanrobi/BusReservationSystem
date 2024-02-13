import axios from "axios";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

/**
 * The base URL of the API server.
 */
const AUTH_API_URL = "http://localhost:8080/api/auth/";

/**
 * Logs in the user by sending a POST request to the authentication API with the provided form data.
 * If the login is successful, the user's access token is stored in the local storage.
 * @param {Object} formData - The login form data.
 * @returns {Promise<Object>} A promise that resolves to the response from the authentication API.
 * @throws {Error} If an error occurs during the login process.
 */
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

/**
 * Registers a new user by sending a POST request to the authentication API with the provided form data.
 * @param {Object} formData - The registration form data.
 * @returns {Promise<Object>} A promise that resolves to the response from the authentication API.
 * @throws {Error} If an error occurs during the registration process.
 */
export async function register(formData) {
  try {
    const response = await axios.post(AUTH_API_URL + "signup", formData);
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Logs out the current user by removing their information from local storage.
 */
export function logout() {
  localStorage.removeItem("user");
}

/**
 * Retrieves the current user from local storage.
 * @returns {Object|null} The current user object, or null if no user is logged in.
 */
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

/**
 * Retrieves the role of the current user.
 * @returns {string|null} The role of the current user, or null if no user is logged in.
 */
export function getUserRole() {
  const user = getCurrentUser();
  return user ? user.roles[0] : null;
}

/**
 * Retrieves the authentication token of the current user.
 * @returns {string|null} The authentication token of the current user, or null if no user is logged in.
 */
export function getAuthToken() {
  const currentUser = getCurrentUser();
  const token = currentUser ? currentUser.accessToken : null;
  return token;
}

/**
 * Adds an event listener for the 'Enter' key to the document.
 * @param {Function} handleSubmit - The function to be called when the 'Enter' key is pressed.
 */
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

/**
 * Checks the authentication status and redirects the user if necessary.
 * @returns {void}
 */
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
