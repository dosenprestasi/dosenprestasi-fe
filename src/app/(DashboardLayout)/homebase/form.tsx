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
import { Homebase } from "@/types/homebase";
import { useEffect, useState } from "react";
import { createHomebase, updateHomebase } from "@/lib/api/homebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  initialValue?: Homebase;
  isEdit?: boolean;
};

export const Form = ({ initialValue, isEdit = false }: Props) => {
  const router = useRouter();

  const [formData, setFormData] = useState<Homebase>({} as Homebase);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
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
        await updateHomebase(formData);
        message = "Data berhasil diedit";
      } else {
        await createHomebase(formData);
      }
      toast.success(message);
      router.push("/homebase");
    } catch (error) {
      toast.error("Gagal memproses data" + error);
      console.error("Gagal update data dosen:", error);
    }
  };

  useEffect(() => {
    const fetchHomebase = async () => {
      if (initialValue) {
        setFormData(initialValue);
      }
      try {
      } catch (error) {
      } finally {
      }
    };
    fetchHomebase();
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
              htmlFor="Homebase"
              mb="5px"
            >
              Homebase
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
            <Button type="submit">Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
