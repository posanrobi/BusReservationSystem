import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

// get all users
export async function getAllUsers() {
  try {
    return await axios.get(API_URL + "users", { headers: authHeader() });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

// get all buslines
export async function getAllBusLines() {
  try {
    return await axios.get(API_URL + "bus-lines", { headers: authHeader() });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

// get all dates and times
export async function getAllBusLineDatesAndTimes() {
  try {
    return await axios.get(API_URL + "busline-date-time", {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

// get all reservations
export async function getAllReservations() {
  try {
    return await axios.get(API_URL + "reservations", {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

// reservation data
export async function createReservation(reservationData) {
  const response = await axios.post(API_URL + "reservations", reservationData, {
    headers: authHeader(),
  });
  return response;
}

// delete reservation by id
export async function deleteReservation(resId) {
  try {
    return await axios.delete(API_URL + "reservations/" + resId, {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Could not delete reservation");
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

// update password
/* export async function updatePassword(userId, passwordData) {
  try {
    return await axios.put(
      API_URL + "users/" + userId + "/update-password",
      passwordData,
      { headers: authHeader() }
    );
  } catch (error) {
    throw new Error("Could not update password");
  }
} */

// update password
export async function updatePassword(userId, passwordData) {
  try {
    return await axios.put(
      API_URL + "users/" + userId + "/update-password",
      passwordData,
      { headers: authHeader() }
    );
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Could not update password");
    }
  }
}

// update user (firstname, lastname, username, email)
export async function updateUser(userId, userData) {
  try {
    return await axios.put(API_URL + "users/" + userId, userData, {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Could not update user");
  }
}
