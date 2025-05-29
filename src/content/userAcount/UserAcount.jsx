import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Card,
  CardActionArea,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DadosConta from "./dadosConta/DadosConta";
import Enderecos from "./enderecos/Enderecos";
import Pedidos from "./pedidos/Pedidos";
import Chamados from "./chamados/Chamados";

const menu = [
  { label: "Minha Conta", icon: <AccountCircleIcon />, tab: 0 },
  { label: "Meus Pedidos", icon: <ListAltIcon />, tab: 1 },
  { label: "Endereços", icon: <LocationOnIcon />, tab: 2 },
  { label: "Chamados", icon: <SupportAgentIcon />, tab: 3 },
];

function UserAcount() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const theme = useTheme();

  React.useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: theme.palette.nge.dark,
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
      }}
    >
      {/* Menu lateral */}
      <Box
        sx={{
          width: 280,
          background: `linear-gradient(135deg, ${theme.palette.nge.dark} 80%, #18181a 100%)`,
          color: "#fff",
          p: 3,
          minHeight: "100vh",
          borderRight: `2px solid ${theme.palette.nge.purple}`,
          boxShadow: `4px 0 16px 0 ${theme.palette.nge.purple}33`,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
              textShadow: `0 0 10px ${theme.palette.nge.neonGreen}`,
              letterSpacing: "0.08em",
            }}
          >
            <AccountCircleIcon sx={{ mr: 1, color: theme.palette.nge.red }} />
            Minha Conta
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            cursor: "pointer",
            width: "fit-content",
            "&:hover .MuiSvgIcon-root": {
              color: theme.palette.nge.neonGreen,
            },
          }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIosNewIcon sx={{ color: theme.palette.nge.red, mr: 1, fontSize: 22 }} />
          <Typography
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.red,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "0.05em",
            }}
          >
            Voltar
          </Typography>
        </Box>
        {menu.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              background:
                tab === item.tab
                  ? `linear-gradient(90deg, ${theme.palette.nge.purple}33 0%, transparent 100%)`
                  : "transparent",
              border: tab === item.tab
                ? `2px solid ${theme.palette.nge.red}`
                : `1px solid ${theme.palette.nge.purple}55`,
              cursor: "pointer",
              transition: "background 0.2s, border 0.2s",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: tab === item.tab ? 700 : 500,
              color: tab === item.tab
                ? theme.palette.nge.neonGreen
                : "#fff",
              "&:hover": {
                background: `linear-gradient(90deg, ${theme.palette.nge.purple}22 0%, transparent 100%)`,
                borderColor: theme.palette.nge.neonGreen,
                color: theme.palette.nge.neonGreen,
              },
              boxShadow: tab === item.tab
                ? `0 0 10px ${theme.palette.nge.red}66`
                : "none",
            }}
            onClick={() => setTab(item.tab)}
          >
            <Box sx={{ color: theme.palette.nge.red, mr: 2 }}>{item.icon}</Box>
            <Typography fontWeight={500}>{item.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Conteúdo principal */}
      <Box sx={{ flex: 1, p: { xs: 1, md: 4 } }}>
        {/* Saudação e descrição */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: theme.palette.background.paper,
            color: "#fff",
            fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
            border: `1.5px solid ${theme.palette.nge.purple}`,
            boxShadow: `0 0 16px 0 ${theme.palette.nge.purple}44`,
          }}
          elevation={3}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: theme.palette.nge.neonGreen,
              textShadow: `0 0 10px ${theme.palette.nge.neonGreen}`,
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Olá, {user.nome || user.email?.split("@")[0] || "usuário"}
          </Typography>
          <Typography sx={{ mt: 1, color: "#ccc", fontFamily: "'Rajdhani', sans-serif" }}>
            Aqui você encontra todas as informações relacionadas à sua conta,
            como acompanhar seus últimos pedidos, adicionar novos endereços ...
          </Typography>
          <Divider sx={{ mt: 2, borderColor: theme.palette.nge.red }} />
        </Paper>

        {/* Abas principais em cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {menu.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.tab}>
              <Card
                sx={{
                  background:
                    tab === item.tab
                      ? theme.palette.nge.red
                      : theme.palette.background.paper,
                  color: "#fff",
                  borderRadius: 2,
                  border: tab === item.tab
                    ? `2px solid ${theme.palette.nge.neonGreen}`
                    : `1px solid ${theme.palette.nge.purple}`,
                  boxShadow: tab === item.tab
                    ? `0 0 16px 0 ${theme.palette.nge.red}99`
                    : "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: theme.palette.nge.neonGreen,
                    color: theme.palette.nge.neonGreen,
                  },
                }}
                onClick={() => setTab(item.tab)}
              >
                <CardActionArea sx={{ p: 3, textAlign: "center" }}>
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: 36,
                      mb: 1,
                      color: tab === item.tab
                        ? theme.palette.nge.neonGreen
                        : theme.palette.nge.red,
                      transition: "color 0.2s",
                    },
                  })}
                  <Typography
                    fontWeight={700}
                    sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.label.toUpperCase()}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Conteúdo das abas */}
        <Paper
          sx={{
            p: 3,
            background: theme.palette.background.paper,
            color: "#fff",
            border: `1.5px solid ${theme.palette.nge.purple}`,
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          {tab === 0 && <DadosConta user={user} />}
          {tab === 1 && <Pedidos userId={user.id} />}
          {tab === 2 && <Enderecos userId={user.id} />}
          {tab === 3 && <Chamados userId={user.id} />}
        </Paper>
      </Box>
    </Box>
  );
}

export default UserAcount;