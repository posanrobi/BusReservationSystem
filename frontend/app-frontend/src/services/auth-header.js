import { getCurrentUser } from "./auth.service";

// need to add header to all request which needs authentication eg.: getAllUSers()

export default function authHeader() {
  const user = getCurrentUser();

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
