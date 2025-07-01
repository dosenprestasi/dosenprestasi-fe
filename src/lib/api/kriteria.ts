// src/lib/api/auth.ts
import { apiFetch } from "./client";
import { Kriteria } from "@/types/kriteria";

type dataType = {
  kriterias: Kriteria[];
  kriteria: Kriteria;
};

export async function getAllKriteria(): Promise<Kriteria[]> {
  const res = await apiFetch<{ token: string; data: dataType }>("kriterias", {
    method: "GET",
  });
  return res.data.kriterias;
}

export async function getOneKriteria(id: number): Promise<Kriteria> {
  const res = await apiFetch<{ token: string; data: dataType }>(`kriterias/${id}`, {
    method: "GET",
  });
  console.log(res.data.kriteria);
  return res.data.kriteria;
}

export async function updateKriteria(data: Kriteria): Promise<Kriteria> {
  const res = await apiFetch<{ token: string; data: dataType }>(`kriterias/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data.kriteria;
}

export async function createKriteria(data: Kriteria): Promise<Kriteria> {
  const res = await apiFetch<{ token: string; data: dataType }>(`kriterias`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return res.data.kriteria;
}
