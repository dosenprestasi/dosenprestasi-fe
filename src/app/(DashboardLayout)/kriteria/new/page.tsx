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
import { Dosen } from "@/types/dosen";
import { useParams } from "next/navigation";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { Kriteria } from "@/types/kriteria";
import { Form } from "../form";

const DetailDosenPage = () => {
  const [kriteria, setKriteria] = useState<Kriteria>({} as Kriteria);

  return (
    <PageContainer title="Buat Kriteria" description="Halaman Buat Kriteria">
      <DashboardCard title="Halaman Buat Kriteria">
        <Form initialValue={kriteria} />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailDosenPage;
