import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import EnderecoForm from './EnderecoForm';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useTheme } from '@mui/material/styles';

const NervAddressBox = styled(Box)(({ theme, padrao }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  border: padrao ? `2px solid ${theme.palette.nge.red}` : `1px solid ${theme.palette.nge.purple}`,
  borderRadius: '4px',
  background: padrao ? '#2d2d32' : '#1a1a2e',
  position: 'relative',
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow: `0 0 15px ${padrao ? theme.palette.nge.red : theme.palette.nge.purple}`,
    transform: 'translateY(-3px)'
  }
}));

const NervButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 700,
  borderRadius: '0',
  padding: '10px 24px',
  marginTop: theme.spacing(3),
  background: 'linear-gradient(45deg, #7d26cd, #ff0033)',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff0033, #7d26cd)',
    boxShadow: '0 0 15px rgba(255, 0, 51, 0.5)'
  }
}));

const NervIconButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  background: theme.palette.nge.red,
  transition: 'all 0.3s',
  '&:hover': {
    background: theme.palette.nge.neonGreen,
    color: theme.palette.nge.dark,
    transform: 'scale(1.1)'
  }
}));

export default function Enderecos({ userId }) {
  const theme = useTheme();
  const [enderecos, setEnderecos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editEndereco, setEditEndereco] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/enderecos/${userId}`).then(res => {
      if (res.data.length === 1 && !res.data[0].padrao) {
        axios.put(`http://localhost:3001/enderecos/${res.data[0].id}/padrao`, {
          user_id: userId,
          tipo: res.data[0].tipo
        }).then(() => {
          axios.get(`http://localhost:3001/enderecos/${userId}`).then(res2 => setEnderecos(res2.data));
        });
      } else {
        setEnderecos(res.data);
      }
    });
  }, [userId]);

  function handleSave(data) {
    if (editEndereco) {
      axios.put(`http://localhost:3001/enderecos/${editEndereco.id}`, { ...data, user_id: userId }).then(() => {
        setOpen(false);
        setEditEndereco(null);
        axios.get(`http://localhost:3001/enderecos/${userId}`).then(res => setEnderecos(res.data));
      });
    } else {
      axios.post("http://localhost:3001/enderecos", { ...data, user_id: userId }).then(() => {
        setOpen(false);
        axios.get(`http://localhost:3001/enderecos/${userId}`).then(res => setEnderecos(res.data));
      });
    }
  }

  function handleDelete(id) {
    if (window.confirm("CONFIRMAR EXCLUSÃO DESTE ENDEREÇO?")) {
      axios.delete(`http://localhost:3001/enderecos/${id}`).then(() => {
        axios.get(`http://localhost:3001/enderecos/${userId}`).then(res => setEnderecos(res.data));
      });
    }
  }

  function handleSetPadrao(e) {
    axios.put(`http://localhost:3001/enderecos/${e.id}/padrao`, {
      user_id: userId,
      tipo: e.tipo
    }).then(() => {
      axios.get(`http://localhost:3001/enderecos/${userId}`).then(res => setEnderecos(res.data));
    });
  }

  return (
    <Box p={3} sx={{ background: '#0a0a12', borderRadius: '4px' }}>
      <Typography variant="h4" sx={{
        fontFamily: "'Orbitron', sans-serif",
        background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        mb: 3,
        borderBottom: `2px solid ${theme.palette.nge.purple}`,
        pb: 2,
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        ENDEREÇOS CADASTRADOS
      </Typography>

      {enderecos.length === 0 ? (
        <Box sx={{
          textAlign: 'center',
          p: 4,
          border: `2px dashed ${theme.palette.nge.purple}`,
          borderRadius: '4px'
        }}>
          <Typography variant="h6" sx={{
            mb: 3,
            fontFamily: "'Orbitron', sans-serif",
            color: theme.palette.nge.red
          }}>
            NENHUM ENDEREÇO CADASTRADO
          </Typography>
          <NervButton onClick={() => setOpen(true)}>
            ADICIONAR PRIMEIRO ENDEREÇO
          </NervButton>
        </Box>
      ) : (
        <>
          {enderecos.map(e => (
            <NervAddressBox key={e.id} padrao={e.padrao}>
              <Box sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                display: 'flex',
                gap: 1
              }}>
                <NervIconButton
                  size="small"
                  onClick={() => handleSetPadrao(e)}
                  title="DEFINIR COMO PADRÃO"
                  disabled={e.padrao}
                  sx={{
                    background: e.padrao ? theme.palette.nge.neonGreen : theme.palette.nge.red,
                    color: e.padrao ? theme.palette.nge.dark : '#fff'
                  }}
                >
                  {e.padrao ? <StarIcon /> : <StarBorderIcon />}
                </NervIconButton>
              </Box>

              <Box sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1
              }}>
                <NervIconButton
                  size="small"
                  onClick={() => { setEditEndereco(e); setOpen(true); }}
                  title="EDITAR"
                >
                  <EditIcon fontSize="small" />
                </NervIconButton>

                <NervIconButton
                  size="small"
                  onClick={() => handleDelete(e.id)}
                  title="EXCLUIR"
                >
                  <DeleteIcon fontSize="small" />
                </NervIconButton>
              </Box>

              <Typography variant="h6" sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: e.padrao ? theme.palette.nge.neonGreen : theme.palette.nge.purple,
                mb: 1,
                pr: 6
              }}>
                {e.tipo === 'entrega' ? 'ENDEREÇO DE ENTREGA' : 'ENDEREÇO DE COBRANÇA'}
                {e.padrao && ' (PADRÃO)'}
              </Typography>

              <Typography sx={{
                color: '#fff',
                fontFamily: "'Rajdhani', sans-serif",
                mb: 0.5
              }}>
                <strong>Destinatário:</strong> {e.nome_destinatario}
              </Typography>

              <Typography sx={{
                color: '#fff',
                fontFamily: "'Rajdhani', sans-serif",
                mb: 0.5
              }}>
                <strong>Endereço:</strong> {e.endereco}
              </Typography>

              <Typography sx={{
                color: '#fff',
                fontFamily: "'Rajdhani', sans-serif",
                mb: 0.5
              }}>
                <strong>Cidade/Estado:</strong> {e.cidade} - {e.estado}
              </Typography>

              <Typography sx={{
                color: '#fff',
                fontFamily: "'Rajdhani', sans-serif",
                mb: 0.5
              }}>
                <strong>CEP:</strong> {e.cep}
              </Typography>

              <Typography sx={{
                color: '#fff',
                fontFamily: "'Rajdhani', sans-serif"
              }}>
                <strong>Telefone:</strong> {e.telefone}
              </Typography>
            </NervAddressBox>
          ))}

          <NervButton onClick={() => { setEditEndereco(null); setOpen(true); }}>
            ADICIONAR NOVO ENDEREÇO
          </NervButton>
        </>
      )}

      <EnderecoForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editEndereco}
      />
    </Box>
  );
}