import { axiosWrapper } from '@/lib/axiosWrapper';
import { create } from 'zustand'
import { type SignUpPayload } from '@repo/types'
import type { User } from '@repo/types';


interface AuthState {
    authUser?: User
    isCheckingAuth: boolean
    isSigningUp: boolean
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    authUser: undefined,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const res = await axiosWrapper.get("/auth/check");

            set({ authUser: res.data.user });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: undefined });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data: SignUpPayload) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosWrapper.post("/auth/signup", data);
            set({ authUser: res.data.user });
        } catch (error) {
            console.log('Error in signup', error)
        } finally {
            set({ isSigningUp: false });
        }
    },
}))