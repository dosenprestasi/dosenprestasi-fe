// src/lib/api/auth.ts
import { useRouter } from "next/navigation";
import { apiFetch } from "./client";
import { User } from "@/types/user";

export async function login(username: string, password: string): Promise<User> {
  const res = await apiFetch<{ data: { token: string }; user: User }>(
    "auth/login",
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }
  );
  localStorage.setItem("token", res.data.token);
  return res.user;
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function getProfile(): Promise<User> {
  const res = await apiFetch<{ data: { user: User }; }>("auth/profile");
  return res.data.user
}
