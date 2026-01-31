'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  employeeId: string;
  name: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const employeeId = localStorage.getItem('employeeId');

        if (!token || !employeeId) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        const response = await fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
          }
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('employeeId');
          setUser(null);
        }
      } catch (err) {
        console.error('[Auth Check Error]:', err);
        setError('Failed to verify authentication');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('authToken');
      localStorage.removeItem('employeeId');
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('[Logout Error]:', err);
      setError('Failed to logout');
    }
  };

  return { user, isLoading, error, logout };
}
