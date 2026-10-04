import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useMovieStore = create((set, get) => ({
  watchlist: [],
  isLoadingWatchlist: false,

  fetchWatchlist: async () => {
    set({ isLoadingWatchlist: true });
    try {
      const res = await axios.get(`${API_URL}/watchlist`);
      set({ watchlist: res.data, isLoadingWatchlist: false });
    } catch (error) {
      console.error('Failed to fetch watchlist', error);
      set({ isLoadingWatchlist: false });
    }
  },

  addToWatchlist: async (movie) => {
    try {
      const res = await axios.post(`${API_URL}/watchlist`, movie);
      set((state) => ({ watchlist: [res.data, ...state.watchlist] }));
      return { success: true };
    } catch (error) {
      console.error('Add to watchlist failed', error);
      return { success: false };
    }
  },

  removeFromWatchlist: async (movieId) => {
    try {
      await axios.delete(`${API_URL}/watchlist/${movieId}`);
      set((state) => ({
        watchlist: state.watchlist.filter((m) => m.movieId !== movieId.toString())
      }));
      return { success: true };
    } catch (error) {
      console.error('Remove from watchlist failed', error);
      return { success: false };
    }
  },

  isInWatchlist: (movieId) => {
    return get().watchlist.some(m => m.movieId === movieId.toString());
  }
}));
