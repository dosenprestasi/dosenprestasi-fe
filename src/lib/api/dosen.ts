// src/lib/api/auth.ts
import { apiFetch } from "./client";
import { Dosen } from "@/types/dosen";

type dataType = {
  dosens: Dosen[];
  dosen: Dosen;
};

export async function getAllDosen(): Promise<Dosen[]> {
  const res = await apiFetch<{ token: string; data: dataType }>("dosens", {
    method: "GET",
  });
  return res.data.dosens;
}

export async function getOneDosen(dosenId: number): Promise<Dosen> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `dosens/${dosenId}`,
    {
      method: "GET",
    }
  );
  return res.data.dosen;
}

export async function getDosenByPeriode(periodeId: number): Promise<Dosen[]> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    `dosens/periode/${periodeId}`,
    {
      method: "GET",
    }
  );
  return res.data.dosens;
}

export async function updateDosen(dosen: Dosen): Promise<Dosen> {
  const { nama, jabatan, nip, homebaseId } = dosen;
  const res = await apiFetch<{ data: dataType }>(`dosens/${dosen.id}`, {
    body: JSON.stringify({ nama, jabatan, nip, homebaseId }),
    method: "PUT",
  });
  return res.data.dosen;
}

export async function createDosen(dosen: Dosen): Promise<Dosen> {
  const { nama, jabatan, nip, homebaseId } = dosen;
  const res = await apiFetch<{ data: dataType }>(`dosens`, {
    body: JSON.stringify({ nama, jabatan, nip, homebaseId }),
    method: "POST",
  });
  return res.data.dosen;
}

