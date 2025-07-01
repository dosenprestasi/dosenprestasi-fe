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
import { Form } from "../form";
import { SubKriteria } from "@/types/subKriteria";

const DetailDosenPage = () => {
  const [subKriteria, setSubKriteria] = useState<SubKriteria>(
    {} as SubKriteria
  );

  return (
    <PageContainer
      title="Buat Sub Kriteria"
      description="Halaman Buat Sub Kriteria"
    >
      <DashboardCard title="Halaman Buat Sub Kriteria">
        <Form initialValue={subKriteria} />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailDosenPage;
