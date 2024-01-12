import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export async function login(formData) {
  const response = await axios.post(API_URL + "signin", formData);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
}

export async function register(formData) {
  const response = await axios.post(API_URL + "signup", formData);
  return response;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function getUserRole() {
  const user = getCurrentUser();
  return user ? user.roles[0] : null;
}
