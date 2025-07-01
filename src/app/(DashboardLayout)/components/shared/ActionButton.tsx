import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiFetch } from "@/lib/api/client";
import toast from "react-hot-toast";

type Props = {
  url: string;
};

interface DialogProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

const DialogDelete = (props: DialogProps) => {
  const { onClose, open, url } = props;
  const handleClose = () => {
    onClose();
  };

  const handleCancelDelete = () => {
    onClose();
  };

  const handleConfirmDelete = async () => {
    var urlSplit = url.split("/");
    try {

      const res = await apiFetch<{ message?: string }>(
        `${urlSplit[0]}s/${urlSplit[1]}`,
        {
          method: "DELETE",
        }
      );
      toast.success(res.message ?? "")
      window.location.href = `/${urlSplit[0]}`;
    } catch (error: any) {
      toast.error(error.message)
    }
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ padding: 4 }}>
      <DialogTitle align="center" sx={{ my: 4 }}>
        Yakin Hapus Data?
      </DialogTitle>
      <Typography sx={{ mb: 4, mx: 4 }}>
        Data yang dihapus akan mempengaruhi data lain !
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", paddingY: 4 }}
      >
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleCancelDelete}
        >
          Tidak
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={handleConfirmDelete}
        >
          Ya
        </Button>
      </Box>
    </Dialog>
  );
};

export const ActionButton = ({ url }: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", my:'auto' }}>
      <Button
        color="primary"
        variant="contained"
        size="small"
        href={url}
        LinkComponent={Link}
      >
        <VisibilityIcon />
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={handleOpenDialog}
      >
        <DeleteIcon />
      </Button>
      <DialogDelete open={open} onClose={handleClose} url={url}></DialogDelete>
    </Box>
  );
};
