// frontend/src/api/adminApi.js
import axios from "axios";

const BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "adminToken";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically (interceptor)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Auth ----
export async function adminLogin(email, password) {
  try {
    const res = await api.post("/admin/login", { email, password });
    if (res.data.token) {
      localStorage.setItem(TOKEN_KEY, res.data.token);
    }
    return res.data;
  } catch (err) {
    const message = err.response?.data?.error || "Login failed";
    throw new Error(message);
  }
}

export function adminLogout() {
  localStorage.removeItem(TOKEN_KEY);
}

// ---- Guest Management ----
export async function getGuests({
  page = 1,
  perPage = 50,
  status,
  tableNo,
  search,
} = {}) {
  const params = { page, perPage, status, tableNo, search };
  const { data } = await api.get("/admin/guests", { params });
  return data;
}

export async function createGuest(payload) {
  const { data } = await api.post("/admin/guests", payload);
  return data;
}

export async function updateGuest(id, payload) {
  const { data } = await api.put(`/admin/guests/${id}`, payload);
  return data;
}

export async function deleteGuest(id) {
  const { data } = await api.delete(`/admin/guests/${id}`);
  return data;
}

export async function checkinGuest(id) {
  try {
    const { data } = await api.post(`/admin/guests/${id}/checkin`);
    return data;
  } catch (err) {
    const message = err.response?.data?.error || "Check-in failed";
    throw new Error(message);
  }
}

export async function exportCsv() {
  const { data } = await api.get("/admin/export", { responseType: "blob" });
  return data; // caller handles blob download
}

// ✅ ---- Guest Validation (for CheckInPage) ----
export async function validateGuest(id) {
  try {
    const { data } = await api.post("/validate", { id });
    return data;
  } catch (err) {
    const message = err.response?.data?.error || "Validation failed";
    throw new Error(message);
  }
}
