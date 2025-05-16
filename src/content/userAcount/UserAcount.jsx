import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import DadosConta from "./dadosConta/DadosConta";
import Enderecos from "./enderecos/Enderecos";
import Pedidos from "./pedidos/Pedidos";
import Chamados from "./chamados/Chamados";

function UserAcount() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  React.useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null; // ou um loading

  return (
    <Paper sx={{ maxWidth: 900, margin: "40px auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Minha Conta
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="Dados da Conta" />
        <Tab label="Endereços" />
        <Tab label="Pedidos" />
        <Tab label="Chamados" />
      </Tabs>
      <Box>
        {tab === 0 && <DadosConta user={user} />}
        {tab === 1 && <Enderecos userId={user.id} />}
        {tab === 2 && <Pedidos userId={user.id} />}
        {tab === 3 && <Chamados userId={user.id} />}
      </Box>
    </Paper>
  );
}

export default UserAcount;