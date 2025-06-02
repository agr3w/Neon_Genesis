import { Box, CircularProgress } from "@mui/material";

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(10,10,18,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CircularProgress size={80} sx={{ color: "#00ff9d" }} />
    </Box>
  );
}