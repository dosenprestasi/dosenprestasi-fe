// src/lib/api/auth.ts
import { apiFetch } from "./client";
import { SubKriteria } from "@/types/subKriteria";

type dataType = {
  subKriterias: SubKriteria[];
  subKriteria: SubKriteria;
};

export async function getAllSubKriteria(): Promise<SubKriteria[]> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    "sub-kriterias",
    {
      method: "GET",
    }
  );
  return res.data.subKriterias;
}

export async function getOneSubKriteria(id: number): Promise<SubKriteria> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `sub-kriterias/${id}`,
    {
      method: "GET",
    }
  );
  return res.data.subKriteria;
}

export async function updateSubKriteria(
  data: SubKriteria
): Promise<SubKriteria> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `sub-kriterias/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  return res.data.subKriteria;
}

export async function createSubKriteria(
  data: SubKriteria
): Promise<SubKriteria> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `sub-kriterias`,
    {
      body: JSON.stringify(data),
      method: "POST",
    }
  );
  return res.data.subKriteria;
}
