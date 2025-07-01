"use client";
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { getAllPeriode } from "@/lib/api/periode";
import { Periode } from "@/types/periode";
import { Dosen } from "@/types/dosen";
import { getDosenByPeriode } from "@/lib/api/dosen";
import { DataTable } from "../components/shared/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { ActionButton } from "../components/shared/ActionButton";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const PenilaianPage = () => {
  const { user } = useAuth();
  const [periodes, setPeriodes] = useState<Periode[]>([]);
  const [periodeId, setPeriodeId] = useState(0);
  const [dosens, setDosens] = useState<Dosen[]>([]);
  useEffect(() => {
    const prepareData = async () => {
      try {
        var periode = await getAllPeriode();
        setPeriodes(periode);
      } catch (error) {
        console.error("error: ", error);
      }
    };
    prepareData();
  }, []);

  const handleChangePeriode = async (e: SelectChangeEvent | any) => {
    try {
      e.preventDefault();
      const dosen = await getDosenByPeriode(parseInt(e.target.value));
      setDosens(dosen);
      setPeriodeId(parseInt(e.target.value));
    } catch (error) {}
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "nama", headerName: "Nama", flex: 1 },
    { field: "nip", headerName: "NIP", flex: 0.5 },
    {
      field: "Report",
      headerName: "Status Penilaian",
      flex: 0.5,
      renderCell: (row: any) => {
        return row.row.Report[0] ? (
          <Chip label="Sudah Dilakukan Penilaian" color="success" />
        ) : (
          <Chip label="Belum Ada Penilaian" color="error" />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (row: any) => {
        return (
          <Button
            color="primary"
            variant="contained"
            size="small"
            fullWidth
            href={`penilaian/periode/${periodeId}/dosen/${row.row.id}`}
            LinkComponent={Link}
            disabled={
              row.row.Report[0] || !["EVALUATOR", "ADMIN"].includes(user?.role!)
            }
          >
            Buat Penilaian
          </Button>
        );
        // return <ActionButton url={`dosen/${row.id}`} />
      },
    },
  ];

  return (
    <PageContainer title="Halaman Penilaian" description="">
      <DashboardCard title="Halaman Penilaian ">
        <Typography>
          Silahkan pilih periode dan dosen untuk melanjutkan penilaian
        </Typography>
        <Grid container spacing={3}>
          <Grid size={6}>
            <Box mt={2}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="periode"
                mb="5px"
              >
                Periode
              </Typography>
              <Select
                value={periodeId || ""}
                size="small"
                fullWidth
                autoWidth={true}
                name="periode"
                onChange={handleChangePeriode}
              >
                {periodes.map((e, i) => (
                  <MenuItem key={i} value={e.id}>
                    {e.periode}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>
        {dosens.length > 0 ? (
          <Box>
            <DataTable columns={columns} rows={dosens} />
          </Box>
        ) : (
          ""
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default PenilaianPage;
