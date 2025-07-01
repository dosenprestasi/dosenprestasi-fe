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
import { useParams } from "next/navigation";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { Periode } from "@/types/periode";
import { Form } from "../form";

const DetailPeriodePage = () => {
  const [data, setData] = useState<Periode>({} as Periode);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchPeriode = async () => {
      try {
        const data = await getOnePeriode(parseInt(params.id));
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
      }
    };
    fetchPeriode();
  }, []);
  return (
    <PageContainer
      title="Detail Periode"
      description="Halaman Detail Periode"
    >
      <DashboardCard title="Detail Periode">
        <Form initialValue={data} isEdit />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailPeriodePage;
