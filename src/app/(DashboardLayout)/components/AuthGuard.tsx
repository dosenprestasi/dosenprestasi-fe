"use client";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { CircularProgress, Box } from "@mui/material";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { loading } = useAuth();

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return <>{children}</>;
}
