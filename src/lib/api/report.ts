// src/lib/api/auth.ts
import { Form } from "@/types/form";
import { apiFetch } from "./client";
import { FormValue } from "@/types/formValue";
import { PenilaianDosen } from "@/types/penilaianDosen";

type dataType = {
  Report: Report;
  form: Form[];
};

export async function getDosenByReportAndPeriode(
  periodeId: number
): Promise<PenilaianDosen[]> {
  const res = await apiFetch<{
    token: string;
    data: { dosens: PenilaianDosen[] };
  }>(`form/get-saw`, {
    method: "POST",
    body: JSON.stringify({
      periodeId: periodeId,
    }),
  });
  return res.data.dosens;
}

export async function getReport(reportId: number): Promise<PenilaianDosen> {
  const res = await apiFetch<{
    token: string;
    data: { report: PenilaianDosen };
  }>(`form/get-report/${reportId}`, {
    method: "GET",
  });
  return res.data.report;
}
