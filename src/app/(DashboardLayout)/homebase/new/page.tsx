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
import { getOneHomebase, updateHomebase } from "@/lib/api/homebase";
import { Dosen } from "@/types/dosen";
import { useParams } from "next/navigation";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { Homebase } from "@/types/homebase";
import { Form } from "../form";

const DetailDosenPage = () => {
  const [data, setData] = useState<Homebase>({} as Homebase);

  return (
    <PageContainer title="Buat Homebase" description="Halaman Buat Homebase">
      <DashboardCard title="Halaman Buat Homebase">
        <Form initialValue={data} />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailDosenPage;
