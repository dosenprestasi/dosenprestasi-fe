"use client";
import { Button, Link, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { DataTable } from "../components/shared/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllDosen } from "@/lib/api/dosen";
import { Dosen } from "@/types/dosen";
import { ActionButton } from "../components/shared/ActionButton";
import { getAllKriteria } from "@/lib/api/kriteria";
import { Kriteria } from "@/types/kriteria";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.25 },
  { field: "nama", headerName: "Nama", flex: 2 },
  { field: "bobot", headerName: "Bobot (%)", flex: 0.5 },
  {
    field: "action",
    headerName: "action",
    flex: 0.5,
    renderCell: (row) => {
      return <ActionButton url={`kriteria/${row.id}`} />;
    },
  },
];

const Page = () => {
  const [kriterias, setKriterias] = useState<Kriteria[]>([]);
  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const data = await getAllKriteria();
        setKriterias(data);
      } catch (error) {
        console.error("Gagal mengambil data dosen:", error);
      } finally {
        // setLoading(false);
      }
      // var dosen = await getAllDosen();
    };
    fetchDosen();
  }, []);
  return (
    <PageContainer title="Manajemen Kriteria" description="Halaman Kriteria">
      <DashboardCard
        title="Manajemen Kriteria"
        action={
          <Button
            color="primary"
            variant="contained"
            size="large"
            LinkComponent={Link}
            href={"/kriteria/new"}

            // disabled={Loading}
          >
            Tambah Data
          </Button>
        }
      >
        <Typography>
          Ini adalah halaman untuk manajemen data kriteria
        </Typography>
        <DataTable columns={columns} rows={kriterias} />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
