import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

const neonPulse = keyframes`
  0% {
    box-shadow: 0 0 8px #00ff9d, 0 0 16px #ff0033;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 24px #00ff9d, 0 0 48px #ff0033;
    transform: scale(1.01);
  }
  100% {
    box-shadow: 0 0 8px #00ff9d, 0 0 16px #ff0033;
    transform: scale(1);
  }
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: "#ff0033",
          mb: 2,
          fontSize: { xs: "3rem", md: "6rem" },
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: "#00ff9d",
          mb: 2,
        }}
      >
        Página não encontrada
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          fontFamily: "'Rajdhani', sans-serif",
          mb: 4,
        }}
      >
        O sistema não encontrou a página que você procurava.<br />
        Verifique o endereço ou volte para a página inicial.
      </Typography>
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(45deg, #ff0033, #7d26cd)",
          color: "white",
          fontFamily: "'Orbitron', sans-serif",
          animation: `${neonPulse} 1.5s infinite`,
          boxShadow: "0 0 8px #00ff9d, 0 0 16px #ff0033",
          borderRadius: 2,
          px: 4,
          py: 1.5,
          fontSize: "1.1rem",
          letterSpacing: "0.08em",
          transition: "transform 0.2s",
          "&:hover": {
            background: "linear-gradient(45deg, #00ff9d, #ff0033)",
            color: "#0a0a12",
            transform: "scale(1.08)",
            boxShadow: "0 0 32px #00ff9d, 0 0 64px #ff0033",
          },
        }}
        onClick={() => navigate("/")}
      >
        Voltar ao Início
      </Button>
    </Box>
  );
}