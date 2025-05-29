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
  TextField,
  IconButton,
  styled
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const NervDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: `
      linear-gradient(215deg, #0a0a12 40%, rgb(124, 38, 205) 100%),
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
    boxShadow: '0 0 30px rgba(0, 255, 157, 0.5)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #7d26cd, #ff0033)',
      animation: 'scanline 8s linear infinite'
    }
  }
}));

const MessageBubble = styled(Box)(({ theme, type }) => ({
  background: type === 'usuario' 
    ? 'linear-gradient(135deg, #ff0033, #7d26cd)' 
    : 'linear-gradient(135deg, #232326, #0a0a12)',
  color: '#fff',
  padding: theme.spacing(1.5),
  borderRadius: type === 'usuario' ? '12px 12px 0 12px' : '12px 12px 12px 0',
  maxWidth: '80%',
  position: 'relative',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: type === 'usuario' ? '-8px' : 'auto',
    left: type === 'usuario' ? 'auto' : '-8px',
    width: '16px',
    height: '16px',
    background: 'inherit',
    clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
    transform: type === 'usuario' ? 'rotate(270deg)' : 'rotate(180deg)'
  }
}));

export default function ChamadoConversa({ chamado, open, onClose, onUpdate }) {
  const theme = useTheme();
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
    if (onUpdate) onUpdate();
    if (onClose) onClose();
  };

  return (
    <NervDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: 'rgba(10, 10, 18, 0.7)',
          borderBottom: '1px solid',
          borderImage: 'linear-gradient(90deg, #7d26cd, #ff0033) 1',
          position: 'relative'
        }}
      >
        <Typography variant="h6" sx={{ 
          fontFamily: "'Orbitron', sans-serif",
          background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          CHAMADO #{chamado.id} - {chamado.assunto.toUpperCase()}
        </Typography>
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => setCloseDialog(true)}
            disabled={chamado.status === "fechado"}
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(45deg, #ff0033, #7d26cd)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              '&:hover': {
                background: 'linear-gradient(45deg, #7d26cd, #ff0033)'
              }
            }}
          >
            Fechar Chamado
          </Button>
          <IconButton
            onClick={onClose}
            sx={{
              color: theme.palette.nge.red,
              ml: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                '& svg': {
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s'
                }
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      {/* Efeito de scanlines */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 255, 157, 0.05) 0px,
          rgba(0, 255, 157, 0.05) 1px,
          transparent 2px,
          transparent 3px
        )`,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }} />

      <DialogContent sx={{ position: 'relative' }}>
        <Box sx={{ 
          maxHeight: 400, 
          overflowY: "auto", 
          mb: 2,
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(#7d26cd, #ff0033)',
            borderRadius: '3px'
          }
        }}>
          {mensagens.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: msg.autor === "usuario" ? "flex-end" : "flex-start",
                mb: 2,
                px: 1
              }}
            >
              <MessageBubble type={msg.autor}>
                <Typography variant="body2" sx={{ 
                  fontFamily: msg.autor === 'usuario' ? "'Rajdhani', sans-serif" : "'Orbitron', sans-serif",
                  fontSize: '0.9rem'
                }}>
                  {msg.mensagem}
                </Typography>
                <Typography variant="caption" sx={{ 
                  display: 'block',
                  mt: 0.5,
                  opacity: 0.7,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.7rem'
                }}>
                  {new Date(msg.data_envio).toLocaleString()}
                </Typography>
              </MessageBubble>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ 
          display: "flex", 
          gap: 1,
          position: 'relative',
          zIndex: 1
        }}>
          <TextField
            fullWidth
            variant="outlined"
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            placeholder="DIGITE SUA MENSAGEM..."
            disabled={chamado.status === "fechado"}
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
                letterSpacing: '0.05em'
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.nge.neonGreen,
                fontFamily: "'Orbitron', sans-serif"
              }
            }}
            InputProps={{
              style: {
                color: theme.palette.nge.neonGreen,
                fontFamily: "'Orbitron', sans-serif"
              }
            }}
          />
          <Button
            variant="contained"
            onClick={enviarMensagem}
            disabled={chamado.status === "fechado" || !novaMensagem.trim()}
            sx={{
              minWidth: 'auto',
              px: 2,
              background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00a1ff, #00ff9d)'
              },
              '&:disabled': {
                background: '#232326',
                color: '#555'
              }
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </DialogContent>

      {/* Dialog para fechar chamado */}
      <NervDialog open={closeDialog} onClose={() => setCloseDialog(false)}>
        <DialogTitle sx={{
          background: 'linear-gradient(90deg, #0a0a12, #7d26cd33)',
          borderBottom: '1px solid #7d26cd',
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen
        }}>
          MOTIVO DO FECHAMENTO
        </DialogTitle>
        <DialogContent sx={{ pt: 3, margin: 2}}>
          <FormControl fullWidth>
            <InputLabel 
              id="motivo-label"
              sx={{
                color: theme.palette.nge.neonGreen,
                fontFamily: "'Orbitron', sans-serif",
                '&.Mui-focused': {
                  color: theme.palette.nge.neonGreen
                }
              }}
            >
              MOTIVO
            </InputLabel>
            <Select
              labelId="motivo-label"
              value={motivo}
              label="MOTIVO"
              onChange={(e) => setMotivo(e.target.value)}
              sx={{
                color: theme.palette.nge.neonGreen,
                fontFamily: "'Orbitron', sans-serif",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.nge.purple
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.nge.neonGreen
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.nge.neonGreen
                }
              }}
            >
              <MenuItem value="concluido" sx={{ fontFamily: "'Orbitron', sans-serif" }}>CONCLUÍDO COM SUCESSO</MenuItem>
              <MenuItem value="sem_solucao" sx={{ fontFamily: "'Orbitron', sans-serif" }}>SEM SOLUÇÃO</MenuItem>
              <MenuItem value="outro" sx={{ fontFamily: "'Orbitron', sans-serif" }}>OUTRO MOTIVO</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ background: 'rgba(10, 10, 18, 0.7)' }}>
          <Button 
            onClick={() => setCloseDialog(false)}
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
            onClick={handleFecharChamado}
            variant="contained"
            disabled={!motivo}
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(45deg, #ff0033, #7d26cd)',
              letterSpacing: '0.1em',
              '&:hover': {
                background: 'linear-gradient(45deg, #7d26cd, #ff0033)'
              },
              '&:disabled': {
                background: '#232326',
                color: '#555'
              }
            }}
          >
            FECHAR CHAMADO
          </Button>
        </DialogActions>
      </NervDialog>
    </NervDialog>
  );
}