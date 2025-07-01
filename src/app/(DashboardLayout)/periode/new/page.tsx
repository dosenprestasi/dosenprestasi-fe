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
import { getOnePeriode, updatePeriode } from "@/lib/api/periode";
import { Dosen } from "@/types/dosen";
import { useParams } from "next/navigation";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { Periode } from "@/types/periode";
import { Form } from "../form";

const DetailDosenPage = () => {
  const [kriteria, setPeriode] = useState<Periode>({} as Periode);

  return (
    <PageContainer title="Buat Periode" description="Halaman Buat Periode">
      <DashboardCard title="Halaman Buat Periode">
        <Form initialValue={kriteria} />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailDosenPage;
