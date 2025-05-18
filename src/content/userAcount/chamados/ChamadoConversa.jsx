// filepath: c:\Users\weslley\Devs\Neon_Genesis\src\content\userAcount\chamados\ChamadoConversa.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

export default function ChamadoConversa({ chamado, open, onClose, onUpdate }) {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [closeDialog, setCloseDialog] = useState(false);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:3001/chamados/${chamado.id}/mensagens`)
        .then((res) => setMensagens(res.data));
    }
  }, [open, chamado.id]);

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;
    await axios.post(`http://localhost:3001/chamados/${chamado.id}/mensagens`, {
      autor: "usuario",
      mensagem: novaMensagem,
    });
    setNovaMensagem("");
    const res = await axios.get(
      `http://localhost:3001/chamados/${chamado.id}/mensagens`
    );
    setMensagens(res.data);
  };

  const handleFecharChamado = async () => {
    if (!motivo) return;
    await axios.put(`http://localhost:3001/chamados/${chamado.id}/fechar`, {
      motivo,
    });
    setCloseDialog(false);
    if (onUpdate) onUpdate(); // Atualiza a lista de chamados no pai
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Conversa do Chamado #{chamado.id} - {chamado.assunto}
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => setCloseDialog(true)}
          disabled={chamado.status === "fechado"}
          sx={{ ml: 2 }}
        >
          Fechar Chamado
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
          {mensagens.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent:
                  msg.autor === "usuario" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: msg.autor === "usuario" ? "#d60000" : "#232326",
                  color: "#fff",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "70%",
                  alignSelf:
                    msg.autor === "usuario" ? "flex-end" : "flex-start",
                }}
              >
                <Typography variant="body2">{msg.mensagem}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {new Date(msg.data_envio).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <input
            type="text"
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
            disabled={chamado.status === "fechado"} // já está correto!
          />
          <Button
            variant="contained"
            color="success"
            onClick={enviarMensagem}
            disabled={chamado.status === "fechado"} // já está correto!
          >
            Enviar
          </Button>
        </Box>
      </DialogContent>

      {/* Dialog para selecionar motivo do fechamento */}
      <Dialog open={closeDialog} onClose={() => setCloseDialog(false)}>
        <DialogTitle>Motivo do fechamento</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="motivo-label">Motivo</InputLabel>
            <Select
              labelId="motivo-label"
              value={motivo}
              label="Motivo"
              onChange={(e) => setMotivo(e.target.value)}
            >
              <MenuItem value="concluido">Concluído com sucesso</MenuItem>
              <MenuItem value="sem_solucao">Sem solução</MenuItem>
              <MenuItem value="outro">Outro motivo</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCloseDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleFecharChamado}
            variant="contained"
            color="error"
            disabled={!motivo}
          >
            Fechar Chamado
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
