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

import { Homebase } from "@/types/homebase";
import { getAllHomebase } from "@/lib/api/homebase";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.25 },
  { field: "nama", headerName: "Nama Homebase", flex: 1 },
  {
    field: "action",
    headerName: "action",
    flex: 0.25,
    renderCell: (row) => {
      return <ActionButton url={`homebase/${row.id}`} />;
    },
  },
];

const Page = () => {
  const [homebases, setHomebases] = useState<Homebase[]>([]);
  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const data = await getAllHomebase();
        setHomebases(data);
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
    <PageContainer title="Manajemen Homebase" description="Halaman Homebase">
      <DashboardCard
        title="Manajemen Homebase"
        action={
          <Button
            color="primary"
            variant="contained"
            size="large"
            LinkComponent={Link}
            href={"/homebase/new"}

            // disabled={Loading}
          >
            Tambah Data
          </Button>
        }
      >
        <Typography>
          Ini adalah halaman untuk manajemen data homebase
        </Typography>
        <DataTable columns={columns} rows={homebases} />
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
