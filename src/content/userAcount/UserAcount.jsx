// filepath: src/content/userAcount/UserAcount.jsx
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
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

  React.useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#232326" }}>
      {/* Menu lateral */}
      <Box
        sx={{
          width: 280,
          background: "linear-gradient(135deg, #232326 80%, #18181a 100%)",
          color: "#fff",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
            <AccountCircleIcon sx={{ mr: 1, color: "#d60000" }} />
            Minha Conta
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
              background: tab === item.tab ? "#2d2d32" : "transparent",
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { background: "#2d2d32" },
            }}
            onClick={() => setTab(item.tab)}
          >
            <Box sx={{ color: "#d60000", mr: 2 }}>{item.icon}</Box>
            <Typography fontWeight={500}>{item.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Conteúdo principal */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* Saudação e descrição */}
        <Paper
          sx={{ p: 3, mb: 3, background: "#232326", color: "#fff" }}
          elevation={3}
        >
          <Typography variant="h4" fontWeight={700}>
            Olá, {user.nome || user.email?.split("@")[0] || "usuário"}
          </Typography>
          <Typography sx={{ mt: 1, color: "#ccc" }}>
            Aqui você encontra todas as informações relacionadas à sua conta,
            como acompanhar seus últimos pedidos, adicionar novos endereços ...
          </Typography>
          <Divider sx={{ mt: 2, borderColor: "#d60000" }} />
        </Paper>

        {/* Abas principais em cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: tab === 0 ? "#d60000" : "#2d2d32",
                color: "#fff",
                borderRadius: 2,
              }}
              onClick={() => setTab(0)}
            >
              <CardActionArea sx={{ p: 3, textAlign: "center" }}>
                <AccountCircleIcon sx={{ fontSize: 36, mb: 1 }} />
                <Typography fontWeight={700}>MEUS DADOS</Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: tab === 1 ? "#d60000" : "#2d2d32",
                color: "#fff",
                borderRadius: 2,
              }}
              onClick={() => setTab(1)}
            >
              <CardActionArea sx={{ p: 3, textAlign: "center" }}>
                <ListAltIcon sx={{ fontSize: 36, mb: 1 }} />
                <Typography fontWeight={700}>MEUS PEDIDOS</Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: tab === 2 ? "#d60000" : "#2d2d32",
                color: "#fff",
                borderRadius: 2,
              }}
              onClick={() => setTab(2)}
            >
              <CardActionArea sx={{ p: 3, textAlign: "center" }}>
                <LocationOnIcon sx={{ fontSize: 36, mb: 1 }} />
                <Typography fontWeight={700}>ENDEREÇOS</Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: tab === 3 ? "#d60000" : "#2d2d32",
                color: "#fff",
                borderRadius: 2,
              }}
              onClick={() => setTab(3)}
            >
              <CardActionArea sx={{ p: 3, textAlign: "center" }}>
                <SupportAgentIcon sx={{ fontSize: 36, mb: 1 }} />
                <Typography fontWeight={700}>CHAMADOS</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Conteúdo das abas */}
        <Paper sx={{ p: 3, background: "#232326", color: "#fff" }}>
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
