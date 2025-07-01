"use client";
import { Button, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { DataTable } from "../components/shared/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllUser } from "@/lib/api/user";
import { User } from "@/types/user";
import { ActionButton } from "../components/shared/ActionButton";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 250 },
  { field: "role", headerName: "ROLE", width: 250 },
  {
    field: "action",
    headerName: "action",
    width:250,
    renderCell: (row) => {
      return <ActionButton url={`user/${row.id}`} />
    }
  },
];

const UserPage = () => {
  const [dosens, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <PageContainer title="Manajemen User" description="Halaman User">
      <DashboardCard
        title="Manajemen User"
        newBtn urlBtn="user/new"
      >
        <Typography>Ini adalah halaman untuk manajemen data user</Typography>
        <DataTable columns={columns} rows={dosens} />
      </DashboardCard>
    </PageContainer>
  );
};

export default UserPage;
