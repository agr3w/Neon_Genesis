import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  styled
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import ChamadoForm from "./ChamadoForm";
import ChamadoConversa from "./ChamadoConversa";
import { useTheme } from "@mui/material/styles";

const NervCard = styled(Card)(({ theme, status }) => ({
  background: `
    linear-gradient(145deg, #1a1a2e, #0a0a12),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      ${status === 'aberto' ? theme.palette.nge.red + '33' : '#88888833'} 3px,
      transparent 4px
    )`,
  borderLeft: `4px solid ${status === 'aberto' ? theme.palette.nge.red : '#888'}`,
  color: '#fff',
  transition: 'all 0.3s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 20px ${status === 'aberto' ? 'rgba(255, 0, 51, 0.5)' : 'rgba(136, 136, 136, 0.3)'}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: `linear-gradient(90deg, ${theme.palette.nge.purple}, ${theme.palette.nge.red})`,
      animation: 'scanline 3s linear infinite'
    }
  }
}));

const NervChip = styled(Chip)(({ theme, status }) => ({
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.05em',
  background: status === 'aberto' 
    ? `linear-gradient(45deg, ${theme.palette.nge.red}, ${theme.palette.nge.purple})` 
    : `linear-gradient(45deg, #555, #888)`,
  color: '#fff',
  textTransform: 'uppercase'
}));

export default function Chamados({ userId }) {
  const theme = useTheme();
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
    <Box p={2} sx={{background: '#0a0a12', borderRadius: '4px' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        borderBottom: `2px solid ${theme.palette.nge.purple}`,
        pb: 2
      }}>
        <Typography variant="h4" sx={{
          fontFamily: "'Orbitron', sans-serif",
          background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          CHAMADOS ABERTOS
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(45deg, #7d26cd, #ff0033)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff0033, #7d26cd)'
            }
          }}
        >
          Novo Chamado
        </Button>
      </Box>
      
      <ChamadoForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        userId={userId}
        onSuccess={fetchChamados}
      />
      
      <Box>
        {chamados.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center',
            mt: 10,
            p: 4,
            background: 'rgba(10, 10, 18, 0.5)',
            border: `2px dashed ${theme.palette.nge.purple}`,
            borderRadius: 2
          }}>
            <Typography variant="h5" sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.red,
              mb: 3,
              textTransform: 'uppercase'
            }}>
              NENHUM CHAMADO ENCONTRADO
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenForm(true)}
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                background: 'linear-gradient(45deg, #7d26cd, #ff0033)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              ABRIR PRIMEIRO CHAMADO
            </Button>
          </Box>
        ) : (
          chamados.map((c) => (
            <NervCard 
              key={c.id} 
              status={c.status}
              sx={{ mb: 2 }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    mb: 0.5
                  }}>
                    {c.assunto.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#aaa',
                    fontFamily: "'Rajdhani', sans-serif"
                  }}>
                    CÓDIGO: #{c.id}
                  </Typography>
                  <NervChip
                    label={c.status === "aberto" ? "ABERTO" : "FECHADO"}
                    status={c.status}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <IconButton 
                  onClick={() => setSelected(c)}
                  sx={{
                    color: theme.palette.nge.neonGreen,
                    '&:hover': {
                      color: theme.palette.nge.red,
                      transform: 'scale(1.2)',
                      transition: 'all 0.3s'
                    }
                  }}
                >
                  <ChatIcon />
                </IconButton>
              </CardContent>
            </NervCard>
          ))
        )}
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