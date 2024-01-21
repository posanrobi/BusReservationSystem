import axios from "axios";
import authHeader from "./auth-header";

//const API_URL_TEST = "http://localhost:8080/api/test/";

/* export function getPublicContent() {
  return axios.get(API_URL_TEST + "all");
}

export function getUserBoard() {
  return axios.get(API_URL_TEST + "user", { headers: authHeader() });
}

export function getAdminBoard() {
  return axios.get(API_URL_TEST + "admin", { headers: authHeader() });
} */

const API_URL = "http://localhost:8080/api/";

export async function getAllUsers() {
  try {
    return await axios.get(API_URL + "users", { headers: authHeader() });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

export async function getAllBusLines() {
  try {
    return await axios.get(API_URL + "bus-lines", { headers: authHeader() });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

export async function getAllBusLineDatesAndTimes() {
  try {
    return await axios.get(API_URL + "busline-date-time", {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

export async function getAllReservations() {
  try {
    return await axios.get(API_URL + "reservations", {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

// get user by id
export async function getUserById(userId) {
  try {
    return await axios.get(API_URL + "users/" + userId, {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Can not find user by id");
  }
}
