"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SubKriteria } from "@/types/subKriteria";
import { Form } from "../form";
import { getOneSubKriteria } from "@/lib/api/subKriteria";

const DetailSubKriteriaPage = () => {
  const [subKriteria, setSubKriteria] = useState<SubKriteria>({} as SubKriteria);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchSubKriteria = async () => {
      try {
        const data = await getOneSubKriteria(parseInt(params.id));
        console.log(data);
        setSubKriteria(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
      }
    };
    fetchSubKriteria();
  }, []);
  return (
    <PageContainer
      title="Detail SubKriteria"
      description="Halaman Detail SubKriteria"
    >
      <DashboardCard title="Detail SubKriteria">
        <Form initialValue={subKriteria} isEdit />
      </DashboardCard>
    </PageContainer>
  );
};

export default DetailSubKriteriaPage;
