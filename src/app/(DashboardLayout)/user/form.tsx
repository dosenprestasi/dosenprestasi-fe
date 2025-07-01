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
import { User } from "@/types/user";
import { Homebase } from "@/types/homebase";
import { useEffect, useState } from "react";
import { getAllHomebase } from "@/lib/api/homebase";
import { createUser, updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  initialValue?: User;
  isEdit?: boolean;
};

export const Form = ({ initialValue, isEdit = false }: Props) => {
  const router = useRouter();
  const role = ["ADMIN", "EVALUATOR", "KA_HRD", "REKTOR"];
  const [formData, setFormData] = useState<User>({} as User);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateUser(formData);
        toast.success("Data Berhasil Diedit");
      } else {
        await createUser(formData);
        toast.success("Data Berhasil Ditambahkan");
      }
      router.push("/user");
    } catch (error) {
      toast.error("Gagal Membuat Data" + error);
      console.error("Gagal update data dosen:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (initialValue) {
        setFormData(initialValue);
      }
      try {

      } catch (error) {
        console.error("Gagal mengambil data dosen:", error);
      } finally {
      }
    };
    fetchUser();
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
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              value={formData.username || ""}
              variant="outlined"
              fullWidth
              size="small"
              name="username"
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="role"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              value={formData.password || ""}
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              name="password"
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="role"
              mb="5px"
            >
              Role
            </Typography>
            <Select
              value={formData.role || ""}
              size="small"
              fullWidth
              autoWidth={true}
              name="role"
              onChange={handleChange}
            >
              {role.map((e, i) => (
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
