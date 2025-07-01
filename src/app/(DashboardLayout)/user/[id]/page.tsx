"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form } from "../form";
import { User } from "@/types/user";
import { getOneUser } from "@/lib/api/user";

const Page = () => {
  const [data, setData] = useState<User>({} as User);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getOneUser(parseInt(params.id));
        setData(data);
      } catch (error) {
        console.error("Gagal mengambil data data:", error);
      } finally {
      }
    };
    fetchUser();
  }, []);
  return (
    <PageContainer title="Detail User" description="Halaman Detail User">
      <DashboardCard title="Detail User">
        <Form initialValue={data} isEdit />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
