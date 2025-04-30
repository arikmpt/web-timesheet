import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (payload: { token: string }) => void;
  setAuth: (payload: { user: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: ({ token }) => set({ token }),
      setAuth: ({ user }) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'AUTH_STORE',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
