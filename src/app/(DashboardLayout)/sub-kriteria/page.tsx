"use client";
import { Button, Link, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { DataTable } from "../components/shared/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ActionButton } from "../components/shared/ActionButton";
import { Kriteria } from "@/types/kriteria";
import { getAllSubKriteria } from "@/lib/api/subKriteria";
import { SubKriteria } from "@/types/subKriteria";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.25 },
  { field: "nama", headerName: "Nama", flex: 1 },
  { field: "nilaiMaksimal", headerName: "Nilai Maksimal", flex: 0.5 },
  {
    field: "kriteria",
    headerName: "Kriteria",
    flex: 0.5,
    valueGetter: (params: any) => params?.nama,
  },
  {
    field: "action",
    headerName: "action",
    flex: 0.5,
    renderCell: (row) => {
      return <ActionButton url={`sub-kriteria/${row.id}`} />;
    },
  },
];

const Page = () => {
  const [row, setRow] = useState<SubKriteria[]>([]);
  useEffect(() => {
    const fetchSubKriteria = async () => {
      try {
        const data = await getAllSubKriteria();
        setRow(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchSubKriteria();
  }, []);
  return (
    <PageContainer
      title="Manajemen Kriteria"
      description="Halaman Sub Kriteria"
    >
      <DashboardCard
        title="Manajemen Sub Kriteria"
        action={
          <Button
            color="primary"
            variant="contained"
            size="large"
            LinkComponent={Link}
            href={"/sub-kriteria/new"}

            // disabled={Loading}
          >
            Tambah Data
          </Button>
        }
      >
        <Typography>
          Ini adalah halaman untuk manajemen data sub kriteria
        </Typography>
        <DataTable columns={columns} rows={row} />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
