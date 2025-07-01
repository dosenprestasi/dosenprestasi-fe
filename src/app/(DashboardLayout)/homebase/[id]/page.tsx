"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { getOneHomebase, updateHomebase } from "@/lib/api/homebase";
import { useParams } from "next/navigation";
import { Homebase } from "@/types/homebase";
import { Form } from "../form";

const DetailHomebasePage = () => {
  const [data, setData] = useState<Homebase>({} as Homebase);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchHomebase = async () => {
      try {
        const data = await getOneHomebase(parseInt(params.id));
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
      }
    };
    fetchHomebase();
  }, []);
  return (
    <PageContainer
      title="Detail Homebase"
      description="Halaman Detail Homebase"
    >
      <DashboardCard title="Detail Homebase">
        <Form initialValue={data} isEdit />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailHomebasePage;
