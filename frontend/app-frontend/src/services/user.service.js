import axios from "axios";
import authHeader from "./auth-header";
import { getUserRole } from "./auth.service";

const API_URL = "http://localhost:8080/api/test/";
const API_URL_2 = "http://localhost:8080/api/";

export function getPublicContent() {
  return axios.get(API_URL + "all");
}

export function getUserBoard() {
  return axios.get(API_URL + "user", { headers: authHeader() });
}

export function getAdminBoard() {
  return axios.get(API_URL + "admin", { headers: authHeader() });
}

/* export async function getAllUsers() {
  return await axios.get(API_URL_2 + "users", { headers: authHeader() });
}
 */

export async function getAllUsers() {
  const userRole = getUserRole();

  try {
    return await axios.get(API_URL_2 + "users", { headers: authHeader() });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}
