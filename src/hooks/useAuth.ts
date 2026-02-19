'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { login as loginService, logoutServer, getCurrentUser } from '@/services/auth';
import { LoginCredentials } from '@/types';
import { ROUTES } from '@/lib/constants';

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, setTokens, logout: storeLogout } = useAuthStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      // 1. Get tokens
      const tokens = await loginService(credentials);
      setTokens(tokens.access, tokens.refresh);

      // 2. Fetch user profile
      const me = await getCurrentUser();
      setUser(me);

      // 3. Redirect to dashboard
      router.push(ROUTES.MEMBERS);
    },
    [setTokens, setUser, router]
  );

  const logout = useCallback(async () => {
    const { refreshToken } = useAuthStore.getState();
    try {
      if (refreshToken) await logoutServer(refreshToken);
    } catch {
      // Fail silently — still log out locally
    } finally {
      storeLogout();
      router.push(ROUTES.LOGIN);
    }
  }, [storeLogout, router]);

  const refreshUser = useCallback(async () => {
    try {
      const me = await getCurrentUser();
      setUser(me);
    } catch {
      storeLogout();
      router.push(ROUTES.LOGIN);
    }
  }, [setUser, storeLogout, router]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  };
}
