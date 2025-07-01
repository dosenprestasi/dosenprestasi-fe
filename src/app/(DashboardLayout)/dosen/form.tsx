import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CustomTextField from "../components/forms/theme-elements/CustomTextField";
import { Dosen } from "@/types/dosen";
import { Homebase } from "@/types/homebase";
import { useEffect, useState } from "react";
import { getAllHomebase } from "@/lib/api/homebase";
import { createDosen, updateDosen } from "@/lib/api/dosen";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  initialValue?: Dosen;
  isEdit?: boolean;
};

export const Form = ({ initialValue, isEdit = false }: Props) => {
  const router = useRouter();
  const jabatan = [
    "GURU_BESAR",
    "LEKTOR_KEPALA",
    "LEKTOR",
    "ASSISTEN_AHLI",
    "TENAGA_PENGAJAR",
  ];
  const [formData, setFormData] = useState<Dosen>({} as Dosen);
  const [homebase, setHomebase] = useState<Homebase[]>([] as Homebase[]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("object");
      console.log(isEdit);
      if (isEdit) {
        await updateDosen(formData);
      } else {
        await createDosen(formData);
      }
      toast.success("Data Berhasil Ditambahkan");
      router.push("/dosen");
    } catch (error) {
      toast.error("Gagal Membuat Data" + error);
      console.error("Gagal update data dosen:", error);
    }
  };

  useEffect(() => {
    const fetchDosen = async () => {
      if (initialValue) {
        setFormData(initialValue);
      }
      try {
        const homebase = await getAllHomebase();
        setHomebase(homebase);
      } catch (error) {
        console.error("Gagal mengambil data dosen:", error);
      } finally {
      }
    };
    fetchDosen();
  }, [initialValue]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={6}>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="nama"
              mb="5px"
            >
              Nama
            </Typography>
            <CustomTextField
              value={formData.nama || ""}
              variant="outlined"
              fullWidth
              size="small"
              name="nama"
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="jabatan"
              mb="5px"
            >
              NIP
            </Typography>
            <CustomTextField
              value={formData.nip || ""}
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              name="nip"
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="jabatan"
              mb="5px"
            >
              Jabatan
            </Typography>
            <Select
              value={formData.jabatan || ""}
              size="small"
              fullWidth
              autoWidth={true}
              name="jabatan"
              onChange={handleChange}
            >
              {jabatan.map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="homebase"
              mb="5px"
            >
              Homebase
            </Typography>
            <Select
              value={formData.homebaseId || ""}
              size="small"
              fullWidth
              autoWidth={true}
              name="homebaseId"
              onChange={handleChange}
            >
              {homebase.map((e, i) => (
                <MenuItem key={i} value={e.id}>
                  {e.nama}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={2}>
            <Button type="submit">Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
