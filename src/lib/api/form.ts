// src/lib/api/auth.ts
import { Form } from "@/types/form";
import { apiFetch } from "./client";
import { FormValue } from "@/types/formValue";

type dataType = {
  // forms: Form[];
  form: Form[];
};

type FormData = {
  dosenId: number;
  periodeId: number;
  formValue: FormValue[];
  saranPimpinan?: string;
  saranMahasiswa?: string;
};

type Penilaian = {
  id: number;
  nilai: number;
  reportId: number;
  subKriteriaId: number;
  evaluatorId: number;
};

type FormPenilaian = {
  id: number;
  nilaiAkhir: number;
  status: string;
  dosenId: number;
  periodeId: number;
  deskripsi: string;
  Penilaian: Penilaian[];
  saranPimpinan?: string;
  saranMahasiswa?: string;
};

export async function getForm(): Promise<Form[]> {
  const res = await apiFetch<{ token: string; data: dataType }>(
    "form/get-form",
    {
      method: "GET",
    }
  );
  return res.data.form;
}

export async function getPenilaian(
  dosenId: number,
  periodeId: number
): Promise<FormPenilaian> {
  const res = await apiFetch<{ token: string; data: {report: FormPenilaian} }>(
    `form/get-penilaian/periode/${periodeId}/dosen/${dosenId}`,
    {
      method: "GET",
    }
  );
  return res.data.report;
}

// export async function updateForm(data: Form): Promise<Form> {
//   const res = await apiFetch<{ token: string; data: dataType }>(`forms/${data.id}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });
//   return res.data.form;
// }

export async function createForm(data: FormData): Promise<FormData> {
  const res = await apiFetch<{ token: string; data: FormData }>(`form/submit`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return res.data;
}
