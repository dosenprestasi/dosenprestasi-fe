// src/lib/api/auth.ts
import { apiFetch } from "./client";
import { Homebase } from "@/types/homebase";

type dataType = {
  homebases: Homebase[];
  homebase: Homebase;
};

export async function getAllHomebase(): Promise<Homebase[]> {
  const res = await apiFetch<{ token: string; data: dataType }>("homebases", {
    method: "GET",
  });
  return res.data.homebases;
}

export async function getOneHomebase(homebaseId: number): Promise<Homebase> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `homebases/${homebaseId}`,
    {
      method: "GET",
    }
  );
  return res.data.homebase;
}

export async function updateHomebase(homebase: Homebase): Promise<Homebase> {
  const { nama } = homebase;
  const res = await apiFetch<{ data: dataType }>(`homebases/${homebase.id}`, {
    body: JSON.stringify({ nama: nama }),
    method: "PUT",
  });
  return res.data.homebase;
}

export async function createHomebase(data: Homebase): Promise<Homebase> {
  const res = await apiFetch<{ token: string; data: dataType }>(`homebases`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return res.data.homebase;
}
