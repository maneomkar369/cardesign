import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Available roles
      roles: {
        ADMIN: 'admin',
        DESIGNER: 'designer',
        USER: 'user',
        GUEST: 'guest'
      },

      // Authentication actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call - replace with actual API endpoint
          const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
              // Mock authentication logic
              if (email === 'admin@cardesign.com' && password === 'admin123') {
                resolve({
                  id: 1,
                  email: 'admin@cardesign.com',
                  name: 'Admin User',
                  role: get().roles.ADMIN,
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                });
              } else if (email === 'designer@cardesign.com' && password === 'designer123') {
                resolve({
                  id: 2,
                  email: 'designer@cardesign.com',
                  name: 'Designer User',
                  role: get().roles.DESIGNER,
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
                });
              } else if (email === 'user@cardesign.com' && password === 'user123') {
                resolve({
                  id: 3,
                  email: 'user@cardesign.com',
                  name: 'Regular User',
                  role: get().roles.USER,
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
                });
              } else {
                reject(new Error('Invalid credentials'));
              }
            }, 1000);
          });

          set({
            user: response,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return { success: true };
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message
          });
          return { success: false, error: error.message };
        }
      },

      signup: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call - replace with actual API endpoint
          const response = await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                id: Date.now(),
                email: userData.email,
                name: userData.name,
                role: get().roles.USER, // Default role for new users
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
              });
            }, 1000);
          });

          set({
            user: response,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return { success: true };
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      },

      // Role checking utilities
      hasRole: (role) => {
        const { user } = get();
        return user && user.role === role;
      },

      hasAnyRole: (roles) => {
        const { user } = get();
        return user && roles.includes(user.role);
      },

      isAdmin: () => get().hasRole(get().roles.ADMIN),

      isDesigner: () => get().hasRole(get().roles.DESIGNER),

      isUser: () => get().hasRole(get().roles.USER),

      // Get user role
      getUserRole: () => {
        const { user } = get();
        return user ? user.role : get().roles.GUEST;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);