import axios from "axios";
import authHeader from "./auth-header";

/**
 * The base URL of the API server.
 */
const API_URL = "http://localhost:8080/api/";

/**
 * Fetches all users from the server.
 *
 * @returns {Promise<Object>} A Promise containing the response data with all users.
 * @throws {Error} If the request fails due to unauthorized access or expired token.
 */
export async function getAllUsers() {
  try {
    return await axios.get(API_URL + "users", { headers: authHeader() });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Your token is expired. Please login again.");
    }
    throw new Error("Unauthorized access");
  }
}

/**
 * Fetches all buslines from the server.
 *
 * @returns {Promise<Object>} A Promise containing the response data with all buslines.
 * @throws {Error} If the request fails due to unauthorized access or expired token.
 */
export async function getAllBusLines() {
  try {
    return await axios.get(API_URL + "bus-lines", { headers: authHeader() });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Your token is expired. Please login again.");
    }
    throw new Error("Unauthorized access");
  }
}

/**
 * Fetches all busline dates and times from the server.
 *
 * @returns {Promise<Object>} A Promise containing the response data with the dates and times.
 * @throws {Error} If the request fails due to unauthorized access or expired token.
 */
export async function getAllBusLineDatesAndTimes() {
  try {
    return await axios.get(API_URL + "busline-date-time", {
      headers: authHeader(),
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Your token is expired. Please login again.");
    }
    throw new Error("Unauthorized access");
  }
}

/**
 * Fetches all reservation data from the server.
 *
 * @returns {Promise<Object>} A Promise containing the response data with all reservations.
 * @throws {Error} If the request fails due to unauthorized access or expired token.
 */
export async function getAllReservations() {
  try {
    return await axios.get(API_URL + "reservations", {
      headers: authHeader(),
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Your token is expired. Please login again.");
    }
    throw new Error("Unauthorized access");
  }
}

/**
 * Creates a new reservation on the server.
 *
 * @param {Object} reservationData - The data for the reservation to be created.
 * @returns {Promise<Object>} A Promise containing the response data from the server.
 * @throws {Error} If the request fails or if the user's token is expired.
 */
export async function createReservation(reservationData) {
  const response = await axios.post(API_URL + "reservations", reservationData, {
    headers: authHeader(),
  });
  return response;
}

/**
 * Deletes a reservation from the server by its ID.
 *
 * @param {string} resId - The ID of the reservation to be deleted.
 * @returns {Promise} A Promise indicating the success of the deletion.
 * @throws {Error} If the request fails or if there is an issue with the deletion.
 */
export async function deleteReservation(resId) {
  try {
    return await axios.delete(API_URL + "reservations/" + resId, {
      headers: authHeader(),
    });
  } catch (error) {
    throw new Error("Could not delete reservation");
  }
}

/**
 * Fetches a user by its ID.
 *
 * @param {String} userId The ID of the user to be fetched.
 * @returns {Promise<Object>} A Promise containing the response data from the server.
 * @throws {Error} If the request fails or if the user's token is expired.
 */
export async function getUserById(userId) {
  try {
    return await axios.get(API_URL + "users/" + userId, {
      headers: authHeader(),
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Your token is expired. Please login again.");
    }
    throw new Error("Can not find user by id");
  }
}

/**
 * Updates the password of a user by their ID.
 *
 * @param {String} userId The ID of the user whose password will be updated.
 * @param {Object} passwordData The new password data.
 * @returns {Promise} A Promise representing the result of the password update request.
 * @throws {Error} If the request fails or if there is an issue updating the password.
 */
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

/**
 * Upate user data with the given user ID. Includes firsname, lastname, username, email.
 *
 * @param {String} userId The ID of the user whose data will be updated.
 * @param {*} userData The new user data.
 * @returns {Promise<Object>} A Promise representing the result of the user update request.
 * @throws {Error} If the request fails.
 */
export async function updateUser(userId, userData) {
  try {
    return await axios.put(API_URL + "users/" + userId, userData, {
      headers: authHeader(),
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
}

/**
 * Deletes a user by its ID.
 *
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {Promise} A Promise representing the result of the deletion request.
 * @throws {Error} If the request fails.
 */
export async function deleteUser(userId) {
  try {
    return await axios.delete(API_URL + "users/" + userId, {
      headers: authHeader(),
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
  }
}
