"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import jsPDF from "jspdf";
import { getReport } from "@/lib/api/report";
import { useParams } from "next/navigation";
import { PenilaianDosen } from "@/types/penilaianDosen";

const LecturerAssessmentForm: React.FC = () => {
  const [report, setReport] = useState<PenilaianDosen>({} as PenilaianDosen);
  const params = useParams(); // { dosenId: '123' }
  const reportId = params.id as string;
  useEffect(() => {
    const fetchReport = async () => {
      try {
        var report = await getReport(parseInt(reportId));
        setReport(report);
      } catch (error) {}
    };

    fetchReport();
  }, []);

  // Weight configuration
  const weights = {
    education: 0.25,
    research: 0.3,
    communityService: 0.2,
    supporting: 0.05,
    competency: 0.05,
    academicPosition: 0.15,
  };

  const pendidikan =
    (report?.sum?.[0]?.jumlah / report?.sum?.[0]?.total_point) * 100;
  const kuisionerMahasiswa =
    (report?.sum?.[6]?.jumlah / report?.sum?.[6]?.total_point) * 100;
  const kuisionerPimpinan =
    (report?.sum?.[7]?.jumlah / report?.sum?.[7]?.total_point) * 100;

  const totalBidangPendidikan =
    (pendidikan + kuisionerMahasiswa + kuisionerPimpinan) / 3;

  // Classification function
  const getClassification = (score: number): string => {
    if (score >= 80) return "SANGAT BAIK SEKALI";
    if (score >= 70) return "SANGAT BAIK";
    if (score >= 60) return "BAIK";
    if (score >= 45) return "CUKUP";
    return "KURANG";
  };

  const downloadPDF = (report: PenilaianDosen) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Helper function to add text with word wrapping
    const addWrappedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      fontSize = 10
    ) => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + lines.length * fontSize * 0.35;
    };

    // Helper function to draw table
    const drawTable = (
      headers: string[],
      rows: string[][],
      startY: number,
      colWidths: number[]
    ) => {
      let currentY = startY;
      const rowHeight = 8;
      const cellPadding = 2;
      let startX = 20;

      // Draw header
      pdf.setFillColor(200, 200, 200);
      pdf.rect(
        startX,
        currentY,
        colWidths.reduce((a, b) => a + b, 0),
        rowHeight,
        "F"
      );

      pdf.setFontSize(8);
      pdf.setFont("Times-Roman", "bold");
      let xPos = startX;
      headers.forEach((header, i) => {
        const lines = pdf.splitTextToSize(
          header,
          colWidths[i] - cellPadding * 2
        );
        pdf.text(lines, xPos + cellPadding, currentY + 4);

        // Draw vertical line
        if (i < headers.length - 1) {
          pdf.line(
            xPos + colWidths[i],
            currentY,
            xPos + colWidths[i],
            currentY + rowHeight
          );
        }
        xPos += colWidths[i];
      });

      // Draw header border
      pdf.rect(
        startX,
        currentY,
        colWidths.reduce((a, b) => a + b, 0),
        rowHeight
      );
      currentY += rowHeight;

      console.log(rows);
      // Draw rows
      pdf.setFont("Times-Roman", "normal");
      rows.forEach((row, rowIndex) => {
        // Special styling for certain rows
        if (
          row[1] === "Prestasi Tridharma" ||
          (row[0] === "" && row[4] !== "")
        ) {
          pdf.setFillColor(240, 240, 240);
          pdf.rect(
            startX,
            currentY,
            colWidths.reduce((a, b) => a + b, 0),
            rowHeight,
            "F"
          );
          pdf.setFont("Times-Roman", "bold");
        } else {
          pdf.setFont("Times-Roman", "normal");
        }

        xPos = startX;
        row.forEach((cell, cellIndex) => {
          console.log(cell);
          const lines = pdf.splitTextToSize(
            cell,
            colWidths[cellIndex] - cellPadding * 2
          );
          rowHeight;
          const textAlign = cellIndex > 1 ? "center" : "left";
          const textX =
            textAlign === "center"
              ? xPos + colWidths[cellIndex] / 2
              : xPos + cellPadding;

          pdf.text(lines, textX, currentY + 4, { align: textAlign as any });

          // Draw vertical line
          if (cellIndex < row.length - 1) {
            pdf.line(
              xPos + colWidths[cellIndex],
              currentY,
              xPos + colWidths[cellIndex],
              currentY + rowHeight
            );
          }
          xPos += colWidths[cellIndex];
        });

        // Draw row border
        pdf.rect(
          startX,
          currentY,
          colWidths.reduce((a, b) => a + b, 0),
          rowHeight
        );
        currentY += rowHeight;
      });

      return currentY;
    };

    // Header
    pdf.setFontSize(14);
    pdf.setFont("Times-Roman", "bold");
    pdf.text("LAPORAN PENILAIAN KINERJA DOSEN", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 8;

    pdf.text(
      `SEMESTER ${report?.Report?.[0]?.periode?.periode
        .split(" ")[1]
        .toUpperCase()}`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    yPosition += 8;

    pdf.text(
      `TAHUN AKADEMIK ${report?.Report?.[0]?.periode?.periode.split(" ")[0]}`,
      pageWidth / 2,
      yPosition,
      {
        align: "center",
      }
    );
    yPosition += 8;

    pdf.text(
      "INSTITUT BISNIS DAN INFORMATIKA KESATUAN",
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    yPosition += 15;

    // Lecturer Information
    pdf.setFontSize(10);
    pdf.setFont("Times-Roman", "normal");
    pdf.text(`NAMA   \t\t\t: ${report.nama}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`NIDN/NIDK  \t\t: ${report.nip}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`PROGRAM STUDI\t: ${report.homebase.nama}`, 20, yPosition);
    yPosition += 15;

    // Assessment Table
    var assessmentHeaders = [
      "No",
      "Unsur Penilaian",
      "Nilai",
      "Bobot Penilaian (%)",
      "Nilai Akhir",
    ];
    const assessmentRows = [["", "Prestasi Tridharma", "", "", ""]];

    report?.sum?.forEach((e, i) => {
      assessmentRows.push([
        `${i + 1}.`,
        e.nama,
        ((e.jumlah / e.total_point) * 100).toFixed(2),
        e.bobot.toFixed(2),
        (e.normalisasi * 100).toFixed(2),
      ]);
    });

    assessmentRows.push([
      "",
      "TOTAL NILAI AKHIR",
      "",
      "",
      (report.hasil_akhir * 100).toFixed(2),
    ]);

    yPosition = drawTable(
      assessmentHeaders,
      assessmentRows,
      yPosition,
      [10, 100, 20, 20, 20]
    );
    yPosition += 10;

    // Classification Table
    pdf.setFontSize(12);
    pdf.setFont("Times-Roman", "bold");
    pdf.text("KLASIFIKASI PENILAIAN", 20, yPosition);
    yPosition += 10;

    const classificationHeaders = ["TRIDHARMA", "TOTAL NILAI", "NILAI MUTU"];
    const classificationRows: any[] = [];

    report?.sum?.forEach((e, i) => {
      if (i > 3) {
        return false;
      } else if (i === 0) {
        classificationRows.push([
          `BIDANG ${i + 1} (${e.nama})`,
          totalBidangPendidikan.toFixed(2),
          getClassification(totalBidangPendidikan),
        ]);
      } else {
        classificationRows.push([
          `BIDANG ${i + 1} (${e.nama})`,
          ((e.jumlah / e.total_point) * 100).toFixed(2),
          getClassification((e.jumlah / e.total_point) * 100),
        ]);
      }
    });

    classificationRows.push([
      "TOTAL NILAI PELAKSANAAN TRIDHARMA",
      (report.hasil_akhir * 100).toFixed(2),
      getClassification(report.hasil_akhir * 100),
    ]);

    yPosition = drawTable(
      classificationHeaders,
      classificationRows,
      yPosition,
      [100, 30, 40]
    );
    yPosition += 10;

    // Add new page if needed
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    // Criteria Table
    pdf.setFontSize(12);
    pdf.setFont("Times-Roman", "bold");
    pdf.text("Kriteria perhitungan :", 20, yPosition);
    yPosition += 10;

    const criteriaHeaders = ["KLASIFIKASI NILAI", "BOBOT KUALITAS"];
    const criteriaRows = [
      ["80 – 100", "SANGAT BAIK SEKALI"],
      ["70 – 79", "SANGAT BAIK"],
      ["60 – 69", "BAIK"],
      ["45 – 59", "CUKUP"],
      ["0 – 44", "KURANG"],
    ];

    yPosition = drawTable(criteriaHeaders, criteriaRows, yPosition, [80, 90]);
    yPosition += 15;

    // Suggestions
    pdf.setFontSize(12);
    pdf.setFont("Times-Roman", "bold");
    pdf.text("Saran-saran :", 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont("Times-Roman", "bold");
    pdf.text("Mahasiswa", 20, yPosition);
    yPosition += 5;

    pdf.setFont("Times-Roman", "normal");
    yPosition = addWrappedText(
      report?.Report?.[0]?.saranMahasiswa || "",
      20,
      yPosition,
      pageWidth - 40,
      9
    );
    yPosition += 8;

    pdf.setFont("Times-Roman", "bold");
    pdf.text("Pimpinan", 20, yPosition);
    yPosition += 5;

    pdf.setFont("Times-Roman", "normal");
    yPosition = addWrappedText(
      report?.Report?.[0]?.saranPimpinan || "",
      20,
      yPosition,
      pageWidth - 40,
      9
    );
    yPosition += 15;

    // Footer
    var date = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    pdf.text(`Bogor, ${date}`, 20, yPosition);
    yPosition += 8;
    pdf.text("Mengetahui,", 20, yPosition);
    yPosition += 6;
    pdf.text("Rektor,", 20, yPosition);
    yPosition += 25;

    pdf.setFont("Times-Roman", "bold");
    const rectorName =
      "Prof. Dr. Bambang Pamungkas, Ak,. MBA, CA, CPA, CPA (Aust), ASEAN CPA, CIMBA, CSFA, CFrA, CGAE.";
    yPosition = addWrappedText(rectorName, 20, yPosition, 60, 9);
    yPosition += 5;

    pdf.setFont("Times-Roman", "normal");
    pdf.text("NIDN : 0303046206", 20, yPosition);

    // Page footer
    pdf.setFontSize(8);
    pdf.text(
      `Laporan Penilaian Kinerja Dosen Semester ${
        report?.Report?.[0]?.periode?.periode.split(" ")[0]
      } TA ${report?.Report?.[0]?.periode?.periode.split(" ")[1]}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    pdf.save(
      `Laporan_Penilaian_Kinerja_Dosen_${report?.nama.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}.pdf`
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={() => downloadPDF(report)}
        sx={{ mb: 3 }}
      >
        Download PDF
      </Button>

      <Paper id="assessment-form" sx={{ p: 4, bgcolor: "white" }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            LAPORAN PENILAIAN KINERJA DOSEN
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            SEMESTER{" "}
            {report?.Report?.[0]?.periode?.periode.split(" ")[1].toUpperCase()}
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            TAHUN AKADEMIK {report?.Report?.[0]?.periode?.periode.split(" ")[0]}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            INSTITUT BISNIS DAN INFORMATIKA KESATUAN
          </Typography>
        </Box>

        {/* Lecturer Information */}
        <Table sx={{ marginBottom: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "200px" }}>Dosen</TableCell>
              <TableCell>: {report?.nama}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "200px" }}>NIDN/NIDK</TableCell>
              <TableCell>: {report.nip}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "200px" }}>PROGRAM STUDI</TableCell>
              <TableCell>: {report?.homebase?.nama}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Assessment Table */}
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: "bold", width: "5%" }}>
                  No
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "60%" }}>
                  Unsur Penilaian
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", width: "15%", textAlign: "center" }}
                >
                  Nilai
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", width: "10%", textAlign: "center" }}
                >
                  Bobot Penilaian (%)
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", width: "10%", textAlign: "center" }}
                >
                  Nilai Akhir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ fontWeight: "bold", bgcolor: "grey.50" }}
                >
                  Prestasi Tridharma
                </TableCell>
              </TableRow>
              {report?.sum?.map((e, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{e.nama}</TableCell>
                    <TableCell align="center">
                      {((e.jumlah / e.total_point) * 100).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">{e.bobot}</TableCell>
                    <TableCell align="center">
                      {(e.normalisasi * 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell
                  colSpan={4}
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  TOTAL NILAI AKHIR
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  {(report.hasil_akhir * 100).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Classification Table */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          KLASIFIKASI PENILAIAN
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: "bold" }}>TRIDHARMA</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  TOTAL NILAI
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  NILAI MUTU
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report?.sum?.map((e, i) => {
                if (i > 3) {
                  return "";
                }
                return (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      BIDANG {i + 1} ({e.nama})
                    </TableCell>
                    <TableCell align="center">
                      {i === 0
                        ? totalBidangPendidikan.toFixed(2)
                        : ((e.jumlah / e.total_point) * 100).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {i === 0
                        ? getClassification(totalBidangPendidikan)
                        : getClassification((e.jumlah / e.total_point) * 100)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  TOTAL NILAI PELAKSANAAN TRIDHARMA
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  {(report.hasil_akhir * 100).toFixed(2)}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  {getClassification(report.hasil_akhir * 100)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Classification Criteria */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Kriteria perhitungan :
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  KLASIFIKASI NILAI
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  BOBOT KUALITAS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">80 – 100</TableCell>
                <TableCell align="center">SANGAT BAIK SEKALI</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">70 – 79</TableCell>
                <TableCell align="center">SANGAT BAIK</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">60 – 69</TableCell>
                <TableCell align="center">BAIK</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">45 – 59</TableCell>
                <TableCell align="center">CUKUP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">0 – 44</TableCell>
                <TableCell align="center">KURANG</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Suggestions */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Saran-saran :
        </Typography>
        <Box mb={2}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Mahasiswa
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            value={report.Report?.[0]?.saranMahasiswa}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box mb={4}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Pimpinan
          </Typography>
          <TextField
            fullWidth
            multiline
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            rows={2}
            value={report.Report?.[0]?.saranPimpinan}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Footer */}
        <Box textAlign="left" mt={4}>
          <Typography variant="body2" mb={2}>
            Bogor,{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="body2" mb={1}>
            Mengetahui,
          </Typography>
          <Typography variant="body2" mb={1}>
            Rektor,
          </Typography>
          <Box mt={6}>
            <Typography variant="body2" fontWeight="bold">
              Prof. Dr. Bambang Pamungkas, Ak,. MBA, CA, CPA, CPA (Aust), ASEAN
              CPA, CIMBA, CSFA, CFrA, CGAE.
            </Typography>
            <Typography variant="body2">NIDN : 0303046206</Typography>
          </Box>
        </Box>

        {/* Page indicator */}
        <Box textAlign="center" mt={2}>
          <Typography variant="caption" color="text.secondary">
            Laporan Penilaian Kinerja Dosen Semester{" "}
            {report?.Report?.[0]?.periode?.periode.split(" ")[1].toUpperCase()}{" "}
            TA{" "}
            {report?.Report?.[0]?.periode?.periode.split(" ")[0].toUpperCase()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LecturerAssessmentForm;
