"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Form } from "../form";

const Page = () => {
  return (
    <PageContainer title="Detail Dosen" description="Halaman Detail Dosen">
      <DashboardCard title="Detail Dosen">
        <Form />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
