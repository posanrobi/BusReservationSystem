import axios from "axios";

export default function AuthService() {
  const API_URL = "http://localhost:8080/api/auth/";

  async function login(username, password) {
    return await axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  function logout() {
    localStorage.removeItem("user");
  }

  async function register(username, email, password) {
    return await axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
