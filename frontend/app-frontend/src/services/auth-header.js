import { getCurrentUser } from "./auth.service";

export default function authHeader() {
  const user = getCurrentUser();

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
