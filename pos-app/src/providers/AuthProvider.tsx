'use client';
import { sessionApi } from '@/features/login/api/session.api';
import useAuthStore from '@/stores/useAuthStore';
import { useEffect } from 'react';

export default function AuthProvider({ children }: any) {
  const { setAuth } = useAuthStore();

  const onSessionAuth = async () => {
    const user = await sessionApi();

    setAuth({
      username: user.username,
      role: user.role,
    });
  };

  useEffect(() => {
    onSessionAuth();
  }, []);

  return <>{children}</>;
}
