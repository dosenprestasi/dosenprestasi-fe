// src/lib/api/auth.ts
import { apiFetch } from "./client";
import { Periode } from "@/types/periode";

type dataType = {
  periodes: Periode[];
  periode: Periode;
};

export async function getAllPeriode(): Promise<Periode[]> {
  const res = await apiFetch<{ token: string; data: dataType }>("periodes", {
    method: "GET",
  });
  return res.data.periodes;
}

export async function getOnePeriode(id: number): Promise<Periode> {
  const res = await apiFetch<{ token: string; data: dataType }>(`periodes/${id}`, {
    method: "GET",
  });
  return res.data.periode;
}

export async function updatePeriode(data: Periode): Promise<Periode> {
  const res = await apiFetch<{ token: string; data: dataType }>(`periodes/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data.periode;
}

export async function createPeriode(data: Periode): Promise<Periode> {
  const res = await apiFetch<{ token: string; data: dataType }>(`periodes`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return res.data.periode;
}
