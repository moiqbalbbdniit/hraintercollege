// /src/lib/authStore.ts
import { create } from "zustand";
import { toast } from "sonner";


interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  logout: () => {
    set({ token: null });
    toast.error("Session expired. Please login again!");
    // NOTE: You should redirect manually from a component
  },
}));
