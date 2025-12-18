import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
};

// Courses API
export const coursesApi = {
  getAll: (params?: { page?: number; pageSize?: number; status?: string }) =>
    api.get("/courses", { params }),
  getById: (id: string) => api.get(`/courses/${id}`),
  create: (data: any) => api.post("/courses", data),
  update: (id: string, data: any) => api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
};

// Users API
export const usersApi = {
  getAll: (params?: { page?: number; pageSize?: number; role?: string }) =>
    api.get("/users", { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post("/users", data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Categories API
export const categoriesApi = {
  getAll: () => api.get("/categories"),
  create: (data: { name: string; description?: string }) =>
    api.post("/categories", data),
  update: (id: string, data: { name: string; description?: string }) =>
    api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Payments API
export const paymentsApi = {
  getAll: (params?: { page?: number; pageSize?: number; status?: string }) =>
    api.get("/payments", { params }),
  getById: (id: string) => api.get(`/payments/${id}`),
};

// Analytics API
export const analyticsApi = {
  getDashboard: () => api.get("/analytics/dashboard"),
  getRevenue: (period: string) => api.get(`/analytics/revenue?period=${period}`),
  getEnrollments: (period: string) =>
    api.get(`/analytics/enrollments?period=${period}`),
};

export default api;
