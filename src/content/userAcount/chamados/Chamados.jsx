import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import ChamadoForm from "./ChamadoForm";
import ChamadoConversa from "./ChamadoConversa";

/** 
 * @todo adicionar uma IA no chamado para deixar mais veridico
 */

export default function Chamados({ userId }) {
  const [chamados, setChamados] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchChamados = () => {
    axios
      .get(`http://localhost:3001/chamados/${userId}`)
      .then((res) => setChamados(res.data));
  };

  useEffect(() => {
    fetchChamados();
  }, [userId]);

  return (
    <Box p={2}>
      <Typography variant="h6">Chamados Abertos</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
        onClick={() => setOpenForm(true)}
      >
        Abrir Novo Chamado
      </Button>
      <ChamadoForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        userId={userId}
        onSuccess={fetchChamados}
      />
      <Box>
        {chamados.map((c) => (
          <Card
            key={c.id}
            sx={{
              mb: 2,
              background: "#232326",
              color: "#fff",
              borderLeft:
                c.status === "aberto" ? "4px solid #d60000" : "4px solid #888",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {c.assunto}
                </Typography>
                <Typography variant="body2" color="#ccc">
                  Código: #{c.id}
                </Typography>
                <Chip
                  label={c.status === "aberto" ? "Aberto" : "Fechado"}
                  color={c.status === "aberto" ? "success" : "default"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
              <IconButton color="primary" onClick={() => setSelected(c)}>
                <ChatIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
      {selected && (
        <ChamadoConversa
          chamado={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
          onUpdate={fetchChamados}
        />
      )}
    </Box>
  );
}
