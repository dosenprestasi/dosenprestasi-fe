import { Homebase } from "./homebase";
import { Report } from "./report";

export interface PenilaianDosen {
  id: number;
  nama: string;
  nip: string;
  jabatan: string;
  homebase: Homebase;
  homebaseId: number;
  Report?: Report[];
  sum: sum[];
  hasil_akhir: number
}

interface sum {
    id: number;
    nama: string;
    bobot: number;
    total_point: number;
    jumlah: number;
    normalisasi: number;
}
