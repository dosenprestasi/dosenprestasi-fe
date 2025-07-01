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
import { SubKriteria } from "@/types/subKriteria";
import { useEffect, useState } from "react";
import { createSubKriteria, updateSubKriteria } from "@/lib/api/subKriteria";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Kriteria } from "@/types/kriteria";
import { getAllKriteria } from "@/lib/api/kriteria";

type Props = {
  initialValue?: SubKriteria;
  isEdit?: boolean;
};

export const Form = ({ initialValue, isEdit = false }: Props) => {
  const router = useRouter();

  const [formData, setFormData] = useState<SubKriteria>({} as SubKriteria);
  const [kriteria, setKriteria] = useState<Kriteria[]>([] as Kriteria[]);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
      | any
  ) => {
    var elementType = (e.target as HTMLInputElement).type;
    var value =
      elementType == "number" ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    var message = "Data berhasil ditambahkan";
    try {
      if (isEdit) {
        await updateSubKriteria(formData);
        message = "Data berhasil diedit";
      } else {
        await createSubKriteria(formData);
      }
      toast.success(message);
      router.push("/sub-kriteria");
    } catch (error) {
      toast.error("Gagal memproses data" + error);
      console.error("Gagal update data:", error);
    }
  };

  useEffect(() => {
    const fetchSubKriteria = async () => {
      if (initialValue) {
        setFormData(initialValue);
      }
      var kriterias = await getAllKriteria();
      setKriteria(kriterias);
      try {
      } catch (error) {
      } finally {
      }
    };
    fetchSubKriteria();
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
              htmlFor="jenis"
              mb="5px"
            >
              Kriteria
            </Typography>
            <Select
              value={formData.kriteriaId || ""}
              size="small"
              fullWidth
              autoWidth={true}
              name="kriteriaId"
              onChange={handleChange}
            >
              {kriteria.map((e, i) => (
                <MenuItem key={i} value={e.id}>
                  {e.nama}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="nama"
              mb="5px"
            >
              Nilai Maksimal
            </Typography>
            <CustomTextField
              value={formData.nilaiMaksimal || ""}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              name="nilaiMaksimal"
              size="small"
            />
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="jenis"
              mb="5px"
            >
              Jenis
            </Typography>
            <Select
              value={formData.jenis || ""}
              size="small"
              fullWidth
              autoWidth={true}
              name="jenis"
              onChange={handleChange}
            >
              {["BENEFIT", "COST"].map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
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
