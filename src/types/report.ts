import { Homebase } from "./homebase";
import { Periode } from "./periode";

export interface Report {
  id: number;
  nilaiAkhir?: number;
  status: string;
  dosenId: number;
  periodeId: number;
  deskripsi: string;
  periode: Periode;
  saranPimpinan?: string;
  saranMahasiswa?: string;
}
