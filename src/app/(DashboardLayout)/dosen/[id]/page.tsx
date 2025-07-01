"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { getOneDosen, updateDosen } from "@/lib/api/dosen";
import { Dosen } from "@/types/dosen";
import { useParams } from "next/navigation";
import { Form } from "../form";

const Page = () => {
  const [dosen, setDosen] = useState<Dosen>({} as Dosen);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const data = await getOneDosen(parseInt(params.id));
        setDosen(data);
      } catch (error) {
        console.error("Gagal mengambil data dosen:", error);
      } finally {
      }
    };
    fetchDosen();
  }, []);
  return (
    <PageContainer title="Detail Dosen" description="Halaman Detail Dosen">
      <DashboardCard title="Detail Dosen">
        <Form initialValue={dosen} isEdit />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
