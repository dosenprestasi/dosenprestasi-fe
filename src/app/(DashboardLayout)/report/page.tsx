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
import { DataTable } from "../components/shared/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { PenilaianDosen } from "@/types/penilaianDosen";
import { getDosenByReportAndPeriode } from "@/lib/api/report";

const PenilaianPage = () => {
  const [periodes, setPeriodes] = useState<Periode[]>([]);
  const [periodeId, setPeriodeId] = useState(0);
  const [dosens, setDosens] = useState<PenilaianDosen[]>([]);
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
      const dosen = await getDosenByReportAndPeriode(parseInt(e.target.value));
      setDosens(dosen);
      setPeriodeId(parseInt(e.target.value));
    } catch (error) {}
  };

  const columns: GridColDef[] = [
    {
      field: "rank",
      headerName: "Rank",
      flex: 0.25,
    },
    { field: "nama", headerName: "Nama", flex: 1 },
    { field: "nip", headerName: "NIP", flex: 0.5 },
    {
      field: "homebase",
      headerName: "Homebase",
      flex: 0.5,
      renderCell: (row: any) => {
        return row.row.homebase.nama;
      },
    },
    {
      field: "hasil_akhir",
      headerName: "Nilai",
      flex: 0.5,
      renderCell: (row: any) => {
        return parseFloat(row.row.hasil_akhir).toFixed(3);
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (row: any) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              my: "auto",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              href={`penilaian/periode/${periodeId}/dosen/${row.row.id}/show`}
              LinkComponent={Link}
            >
              Lihat Penilaian
            </Button>
            <Button
              color="success"
              variant="contained"
              size="small"
              href={`report/${row.row.Report[0].id}`}
              LinkComponent={Link}
            >
              Generate Report
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <PageContainer title="Halaman Report Penilaian" description="">
      <DashboardCard title="Halaman Report Penilaian ">
        <Typography>Silahkan pilih periode</Typography>
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
          <Box alignContent={"center"} justifyContent={"center"}>
            Belum ada data penilaian di periode ini
          </Box>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default PenilaianPage;
