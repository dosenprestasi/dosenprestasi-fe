import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";

type Props = {
  url: string;
};


export const ActionButton = ({ url }: Props) => {
  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="small"
        fullWidth
        href={url}
        LinkComponent={Link}
      >
        <VisibilityIcon />
      </Button>
    </Box>
  );
};
