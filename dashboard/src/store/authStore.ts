import {create} from 'zustand';

interface User {
    id: number;
    name: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    setAuth: (token: string, user: User | null) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    setAuth: (token, user) => set({accessToken: token, user}),
    clearAuth: () => set({accessToken: null, user: null}),
}));