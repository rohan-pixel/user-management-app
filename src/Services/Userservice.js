import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Optional: Add interceptors for global error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class Userservice {
  static getAllUsers() {
    return api.get("/users");
  }

  static getUser(userId) {
    return api.get(`/users/${userId}`);
  }

  static createUser(user) {
    return api.post("/users", user);
  }

  static updateUser(user, userId) {
    return api.put(`/users/${userId}`, user);
  }

  static deleteUser(userId) {
    return api.delete(`/users/${userId}`);
  }
}
