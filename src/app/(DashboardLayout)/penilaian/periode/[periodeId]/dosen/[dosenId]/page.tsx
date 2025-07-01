"use client";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { Form } from "@/types/form";
import { createForm, getForm } from "@/lib/api/form";
import { FormValue } from "@/types/formValue";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Dosen } from "@/types/dosen";
import { getOneDosen } from "@/lib/api/dosen";
import { Periode } from "@/types/periode";
import { getOnePeriode } from "@/lib/api/periode";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  dosenId: number;
  periodeId: number;
  formValue: FormValue[];
  saranPimpinan?: string;
  saranMahasiswa?: string;
};

const FormPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<Form[]>([]);
  const [formData, setFormData] = useState<FormData>({
    dosenId: 0,
    periodeId: 0,
    formValue: [],
  });
  const [dosen, setDosen] = useState<Dosen>({} as Dosen);
  const [periode, setPeriode] = useState<Periode>({} as Periode);
  const params = useParams(); // { dosenId: '123' }
  const dosenId = params.dosenId as string;
  const periodeId = params.periodeId as string;

  useEffect(() => {
    const prepareData = async () => {
      try {
        var dosen = await getOneDosen(parseInt(dosenId));
        setDosen(dosen);
        var periode = await getOnePeriode(parseInt(periodeId));
        setPeriode(periode);
        var forms = await getForm();
        setForm(forms);
        setFormData({
          ...formData,
          dosenId: parseInt(dosenId),
          periodeId: parseInt(periodeId),
          // saranMahasiswa: forms.
        });
        forms.map((e, i) => {
          e.SubKriteria?.map((el, j) => {
            var value: FormValue = { id: parseInt(el.id), nilai: 0 };
            setFormData((prev) => ({
              ...prev,
              formValue: [...prev.formValue, value],
            }));
          });
        });
      } catch (error) {
        console.error("error: ", error);
      }
    };
    prepareData();
  }, []);

  const handleChangeForm = (id: number, nilai: number) => {
    setFormData((prev) => ({
      ...prev,
      formValue: prev.formValue.map((item) =>
        item.id === id ? { ...item, nilai: nilai } : item
      ),
    }));
  };

  const handleSubmitForm = async () => {
    try {
      await createForm(formData);
      toast.success("Penilaian Berhasil Tersimpan");
      router.push("/penilaian");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <PageContainer title="Halaman Penilaian" description="">
      <DashboardCard title="Halaman Penilaian">
        <Table sx={{ marginBottom: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "100px" }}>Dosen</TableCell>
              <TableCell>: {dosen.nama}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "100px" }}>Periode</TableCell>
              <TableCell>: {periode.periode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {form.map((e, i) => {
          return (
            <Box key={i} sx={{ marginBottom: 3 }}>
              <Typography
                fontWeight={"bold"}
                fontSize={"18px"}
                sx={{ marginBottom: 1 }}
              >
                {i + 1}. {e.nama} (Bobot: {e.bobot}%)
              </Typography>
              <Table>
                <TableBody>
                  {e.SubKriteria?.map((el, j) => {
                    return (
                      <TableRow key={j}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: 1,
                            borderColor: "text.primary",
                            width: "50px",
                          }}
                        >
                          {j + 1}.
                        </TableCell>
                        <TableCell
                          sx={{ border: 1, borderColor: "text.primary" }}
                        >
                          {el.nama}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: 1,
                            borderColor: "text.primary",
                            width: "150px",
                          }}
                        >
                          {el.nama.includes("Kuesioner") ? (
                            <CustomTextField
                              variant="outlined"
                              fullWidth
                              type="number"
                              size="small"
                              placeholder={`Maksimal ${el.nilaiMaksimal}`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                if (
                                  parseFloat(e.target.value) > el.nilaiMaksimal
                                ) {
                                  alert(
                                    "nilai tidak boleh lebih dari " +
                                      el.nilaiMaksimal
                                  );
                                  e.target.value = "0";
                                  return false;
                                }
                                handleChangeForm(
                                  parseInt(el.id),
                                  parseFloat(e.target.value)
                                );
                              }}
                            />
                          ) : (
                            <Checkbox
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleChangeForm(
                                    parseInt(el.id),
                                    el.nilaiMaksimal
                                  );
                                } else {
                                  handleChangeForm(parseInt(el.id), 0);
                                }
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          );
        })}

        <Box mb={4}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Saran Pimpinan
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={formData?.saranPimpinan}
            onChange={(e) =>
              setFormData({ ...formData, saranPimpinan: e.target.value })
            }
            variant="outlined"
            size="small"
          />
        </Box>
        <Box mb={4}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Saran Mahasiswa
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={formData?.saranMahasiswa}
            onChange={(e) =>
              setFormData({ ...formData, saranMahasiswa: e.target.value })
            }
            variant="outlined"
            size="small"
          />
        </Box>

        <Button
          color="primary"
          variant="contained"
          size="medium"
          onClick={handleSubmitForm}
        >
          Submit
        </Button>
      </DashboardCard>
    </PageContainer>
  );
};

export default FormPage;
