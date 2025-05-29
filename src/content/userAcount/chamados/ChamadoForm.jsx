import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem, 
  Alert,
  styled 
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const NervDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: `
      linear-gradient(215deg, #0a0a12 40%, rgba(124, 38, 205, 0.64) 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 5px,
        #00ff9d33 5px,
        #00ff9d33 10px
      )`,
    border: '2px solid',
    borderImage: 'linear-gradient(45deg, #7d26cd, #ff0033) 1',
    color: theme.palette.nge.neonGreen,
    boxShadow: '0 0 30px rgba(0, 255, 157, 0.5)'
  }
}));

const tipos = [
  { value: "manutencao", label: "MANUTENÇÃO" },
  { value: "reposicao", label: "REPOSIÇÃO DE PEÇA" },
  { value: "compra", label: "PROBLEMA COM COMPRA" },
  { value: "outro", label: "OUTRO" },
];

export default function ChamadoForm({ open, onClose, userId, onSuccess }) {
  const theme = useTheme();
  const [form, setForm] = useState({ tipo: "", titulo: "", mensagem: "" });
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      await axios.post("http://localhost:3001/chamados", {
        user_id: userId,
        tipo: form.tipo,
        titulo: form.titulo,
        mensagem: form.mensagem,
      });
      setMsg("CHAMADO ABERTO COM SUCESSO! ENTRAREMOS EM CONTATO EM BREVE.");
      setTimeout(() => {
        setMsg("");
        onSuccess();
        onClose();
      }, 2000);
    } catch {
      setMsg("ERRO AO ABRIR CHAMADO. TENTE NOVAMENTE.");
    }
  }

  return (
    <NervDialog open={open} onClose={onClose}>
      <DialogTitle sx={{
        fontFamily: "'Orbitron', sans-serif",
        background: 'linear-gradient(90deg, #0a0a12, #7d26cd33)',
        borderBottom: '1px solid #7d26cd',
        color: theme.palette.nge.neonGreen,
        textTransform: 'uppercase'
      }}>
        ABRIR NOVO CHAMADO
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <TextField
          select
          label="TIPO DE PROBLEMA"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          fullWidth
          margin="dense"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.nge.purple,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.nge.neonGreen,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.nge.neonGreen,
              },
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
              '&.Mui-focused': {
                color: theme.palette.nge.neonGreen
              }
            }
          }}
        >
          {tipos.map((t) => (
            <MenuItem 
              key={t.value} 
              value={t.value}
              sx={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {t.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="TÍTULO"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          fullWidth
          margin="dense"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.nge.purple,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.nge.neonGreen,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.nge.neonGreen,
              },
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
              '&.Mui-focused': {
                color: theme.palette.nge.neonGreen
              }
            }
          }}
        />
        <TextField
          label="EXPLIQUE A SITUAÇÃO"
          name="mensagem"
          value={form.mensagem}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.nge.purple,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.nge.neonGreen,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.nge.neonGreen,
              },
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
              '&.Mui-focused': {
                color: theme.palette.nge.neonGreen
              }
            }
          }}
        />
        {msg && (
          <Alert 
            severity={msg.includes("ERRO") ? "error" : "success"} 
            sx={{ 
              mt: 2,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '0.05em'
            }}
          >
            {msg}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ background: 'rgba(10, 10, 18, 0.7)' }}>
        <Button 
          onClick={onClose}
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: theme.palette.nge.neonGreen,
            '&:hover': {
              color: theme.palette.nge.red
            }
          }}
        >
          CANCELAR
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            '&:hover': {
              background: 'linear-gradient(45deg, #00a1ff, #00ff9d)'
            }
          }}
        >
          ENVIAR
        </Button>
      </DialogActions>
    </NervDialog>
  );
}