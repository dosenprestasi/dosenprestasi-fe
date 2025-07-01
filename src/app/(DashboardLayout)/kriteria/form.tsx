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
import { Kriteria } from "@/types/kriteria";
import { useEffect, useState } from "react";
import { createKriteria, updateKriteria } from "@/lib/api/kriteria";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  initialValue?: Kriteria;
  isEdit?: boolean;
};

export const Form = ({ initialValue, isEdit = false }: Props) => {
  const router = useRouter();

  const [formData, setFormData] = useState<Kriteria>({} as Kriteria);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    var elementType = (e.target as HTMLInputElement).type
    var value = elementType == "number" ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    var message = "Data berhasil ditambahkan"
    try {
      if (isEdit) {
        await updateKriteria(formData);
        message = "Data berhasil diedit"
      } else {
        await createKriteria(formData);
      }
      toast.success(message);
      router.push("/kriteria");
    } catch (error) {
      toast.error("Gagal memproses data" + error);
      console.error("Gagal update data dosen:", error);
    }
  };

  useEffect(() => {
    const fetchKriteria = async () => {
      if (initialValue) {
        setFormData(initialValue);
      }
      try {
      } catch (error) {
      } finally {
      }
    };
    fetchKriteria();
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
              onChange={handleChange}
              variant="outlined"
              fullWidth
              name="nama"
              size="small"
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
              Bobot
            </Typography>
            <CustomTextField
              value={formData.bobot ?? 0}
              onChange={handleChange}
              type="number"
              variant="outlined"
              fullWidth
              name="bobot"
              size="small"
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
              Deskripsi
            </Typography>
            <CustomTextField
              value={formData.deskripsi || ""}
              onChange={handleChange}
              type="text"
              variant="outlined"
              fullWidth
              name="deskripsi"
              size="small"
            />
          </Box>
          <Box mt={2}>
            <Button type="submit">Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
