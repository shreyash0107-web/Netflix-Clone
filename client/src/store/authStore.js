import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true; // Very important for sending cookies

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      set({ user: res.data, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || (error.code === 'ERR_NETWORK' ? 'Unable to connect to the server. Is the backend running?' : 'Login failed');
      return { success: false, message: msg };
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      set({ user: res.data, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || (error.code === 'ERR_NETWORK' ? 'Unable to connect to the server. Is MongoDB running locally?' : 'Signup failed');
      return { success: false, message: msg };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error', error);
    }
  },

  deleteAccount: async () => {
    try {
      await axios.delete(`${API_URL}/auth/delete`);
      set({ user: null, isAuthenticated: false });
      return { success: true };
    } catch (error) {
      console.error('Delete account error', error);
      return { success: false };
    }
  }
}));
