"use client";
import { Button, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { DataTable } from "../components/shared/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllDosen } from "@/lib/api/dosen";
import { Dosen } from "@/types/dosen";
import { ActionButton } from "../components/shared/ActionButton";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.25 },
  { field: "nama", headerName: "Nama", flex: 1 },
  { field: "nip", headerName: "NIP", flex: 1 },
  {
    field: "jabatan",
    headerName: "Jabatan",
    flex:1,
  },
  {
    field: "action",
    headerName: "action",
    flex:0.75,
    renderCell: (row) => {
      return <ActionButton url={`dosen/${row.id}`} />
    }
  },
];

const DosenPage = () => {
  const [dosens, setDosens] = useState<Dosen[]>([]);
  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const data = await getAllDosen();
        setDosens(data);
      } catch (error) {
        console.error("Gagal mengambil data dosen:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchDosen();
  }, []);
  return (
    <PageContainer title="Manajemen Dosen" description="Halaman Dosen">
      <DashboardCard
        title="Manajemen Dosen"
        newBtn urlBtn="dosen/new"
      >
        <Typography>Ini adalah halaman untuk manajemen data dosen</Typography>
        <DataTable columns={columns} rows={dosens} />
      </DashboardCard>
    </PageContainer>
  );
};

export default DosenPage;
