import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

type Props = {
  rows?: any[];
  columns: any[];
};

const paginationModel = { page: 0, pageSize: 10 };

export const DataTable = ({ rows, columns }: Props) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      showToolbar
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[10, 25, 50, 100]}
      sx={{ border: 0 }}
    />
  );
};
