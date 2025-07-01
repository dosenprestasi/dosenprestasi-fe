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

import { Periode } from "@/types/periode";
import { getAllPeriode } from "@/lib/api/periode";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.25 },
  { field: "periode", headerName: "Periode", flex: 1 },
  {
    field: "action",
    headerName: "action",
    flex: 0.5,
    renderCell: (row) => {
      return <ActionButton url={`periode/${row.id}`} />;
    },
  },
];

const Page = () => {
  const [periodes, setPeriodes] = useState<Periode[]>([]);
  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const data = await getAllPeriode();
        setPeriodes(data);
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
    <PageContainer title="Manajemen Periode" description="Halaman Periode">
      <DashboardCard
        title="Manajemen Periode"
        action={
          <Button
            color="primary"
            variant="contained"
            size="large"
            LinkComponent={Link}
            href={"/periode/new"}

            // disabled={Loading}
          >
            Tambah Data
          </Button>
        }
      >
        <Typography>
          Ini adalah halaman untuk manajemen data periode
        </Typography>
        <DataTable columns={columns} rows={periodes} />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
