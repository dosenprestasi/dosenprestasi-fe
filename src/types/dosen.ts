import { Homebase } from "./homebase";
import { Report } from "./report";

export interface Dosen {
  id: number;
  nama: string;
  nip: string;
  jabatan: string;
  homebase: Homebase;
  homebaseId: string;
  Report?: Report[]
}
