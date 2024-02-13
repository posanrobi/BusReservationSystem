import { getCurrentUser } from "./auth.service";

/**
 * Generates the Authorization header for authenticated requests using the access token.
 * @returns {Object} An object containing the Authorization header with the access token,
 * or an empty object if no user is logged in.
 */
export default function authHeader() {
  const user = getCurrentUser();

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
