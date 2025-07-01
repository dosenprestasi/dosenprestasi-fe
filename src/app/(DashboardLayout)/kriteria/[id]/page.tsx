"use client";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { getOneKriteria, updateKriteria } from "@/lib/api/kriteria";
import { useParams } from "next/navigation";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { Kriteria } from "@/types/kriteria";
import { Form } from "../form";

const DetailKriteriaPage = () => {
  const [kriteria, setKriteria] = useState<Kriteria>({} as Kriteria);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchKriteria = async () => {
      try {
        const data = await getOneKriteria(parseInt(params.id));
        console.log(data);
        setKriteria(data);
      } catch (error) {
        console.error("Gagal mengambil data dosen:", error);
      } finally {
      }
    };
    fetchKriteria();
  }, []);
  return (
    <PageContainer
      title="Detail Kriteria"
      description="Halaman Detail Kriteria"
    >
      <DashboardCard title="Detail Kriteria">
        <Form initialValue={kriteria} isEdit />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailKriteriaPage;
