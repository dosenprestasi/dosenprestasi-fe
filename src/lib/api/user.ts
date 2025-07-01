// src/lib/api/auth.ts
import { apiFetch } from "./client";
import { User } from "@/types/user";

type dataType = {
  users: User[];
  user: User;
};

export async function getAllUser(): Promise<User[]> {
  const res = await apiFetch<{ token: string; data: dataType }>("users", {
    method: "GET",
  });
  return res.data.users;
}

export async function getOneUser(id: number): Promise<User> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `users/${id}`,
    {
      method: "GET",
    }
  );
  return res.data.user;
}

export async function updateUser(data: User): Promise<User> {
  const res = await apiFetch<{ data: dataType }>(`users/${data.id}`, {
    body: JSON.stringify(data),
    method: "PUT",
  });
  return res.data.user;
}

export async function createUser(data: User): Promise<User> {
  const res = await apiFetch<{ data: dataType }>(`users`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return res.data.user;
}
