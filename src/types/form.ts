import { SubKriteria } from "./subKriteria";

export interface Form {
  id: number;
  nama: string;
  deskripsi: string;
  jenis: string;
  bobot: number;
  SubKriteria?: SubKriteria[]
}
