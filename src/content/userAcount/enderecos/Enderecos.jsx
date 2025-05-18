// filepath: src/content/userAcount/enderecos/Enderecos.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import EnderecoForm from './EnderecoForm';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Enderecos({ userId }) {
  const [enderecos, setEnderecos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editEndereco, setEditEndereco] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/enderecos/${userId}`).then(res => {
      // Se só houver um endereço, torna padrão
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
    if (window.confirm("Deseja realmente excluir este endereço?")) {
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
    <Box p={2}>
      <Typography variant="h6">Endereços Cadastrados</Typography>
      {enderecos.map(e => (
        <Box key={e.id} sx={{ mb: 2, p: 2, border: e.padrao ? '2px solid #d60000' : '1px solid #d60000', borderRadius: 2, position: 'relative', background: e.padrao ? '#2d2d32' : 'transparent' }}>
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 8, right: 40, color: '#fff', background: '#d60000' }}
            onClick={() => { setEditEndereco(e); setOpen(true); }}
            title="Editar"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', background: '#d60000' }}
            onClick={() => handleDelete(e.id)}
            title="Excluir"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 8, left: 8, color: e.padrao ? '#ffd600' : '#fff', background: '#d60000' }}
            onClick={() => handleSetPadrao(e)}
            title="Definir como padrão"
            disabled={e.padrao}
          >
            {e.padrao ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <Typography fontWeight={700}>{e.tipo === 'entrega' ? 'Endereço de Entrega' : 'Endereço de Cobrança'}</Typography>
          <Typography>{e.nome_destinatario}</Typography>
          <Typography>{e.endereco}, {e.cidade} - {e.estado}, {e.cep}</Typography>
          <Typography>Tel: {e.telefone}</Typography>
        </Box>
      ))}
      <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={() => { setEditEndereco(null); setOpen(true); }}>
        Adicionar Novo Endereço
      </Button>
      <EnderecoForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editEndereco}
      />
    </Box>
  );
}