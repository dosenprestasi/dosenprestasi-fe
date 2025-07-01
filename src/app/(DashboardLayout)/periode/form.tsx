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
import { Periode } from "@/types/periode";
import { useEffect, useState } from "react";
import { createPeriode, updatePeriode } from "@/lib/api/periode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  initialValue?: Periode;
  isEdit?: boolean;
};

export const Form = ({ initialValue, isEdit = false }: Props) => {
  const router = useRouter();

  const [formData, setFormData] = useState<Periode>({} as Periode);

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
        await updatePeriode(formData);
        message = "Data berhasil diedit"
      } else {
        await createPeriode(formData);
      }
      toast.success(message);
      router.push("/periode");
    } catch (error) {
      toast.error("Gagal memproses data" + error);
      console.error("Gagal update data dosen:", error);
    }
  };

  useEffect(() => {
    const fetchPeriode = async () => {
      if (initialValue) {
        setFormData(initialValue);
      }
      try {
      } catch (error) {
      } finally {
      }
    };
    fetchPeriode();
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
              htmlFor="Periode"
              mb="5px"
            >
              Periode
            </Typography>
            <CustomTextField
              value={formData.periode || ""}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              name="periode"
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
