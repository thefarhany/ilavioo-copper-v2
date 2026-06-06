import { create } from "zustand";
import { authApi } from "@/lib/api";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

// Simple store without persist - server validates the httpOnly cookie
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      if (response.success) {
        set({ user: response.data.user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      set({ error: message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Check auth from server using the httpOnly cookie (auto-sent with withCredentials)
  checkAuth: async () => {
    try {
      const response = await authApi.me();
      if (response.success && response.data.user) {
        set({ user: response.data.user, isAuthenticated: true });
        return true;
      }
      set({ user: null, isAuthenticated: false });
      return false;
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  clearError: () => set({ error: null }),
}));
