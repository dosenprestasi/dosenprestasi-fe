// src/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import {
  login as loginApi,
  logout as logoutApi,
  getProfile,
} from "@lib/api/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export function useAuth(
  options: { redirectTo?: string; requireAuth?: boolean } = {}
) {
  const { redirectTo = "/login", requireAuth = true } = options;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (!token) {
      if (requireAuth) router.replace(redirectTo);
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await getProfile();
        setUser(res)
      } catch (err) {
        localStorage.removeItem("token");
        if (requireAuth) router.replace(redirectTo);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, redirectTo, router]);

  const login = async (username: string, password: string) => {
    const res = await loginApi(username, password);
    setUser(res);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/login");
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
