import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Paper } from '@mui/material';

// Altere o caminho abaixo para o local correto do seu logo e das fotos dos fundadores
import logo from '../../assets/logo.png';
import fotoWeslley from '../../assets/WSL.png';
import FotoYuri from '../../assets/YMN.png';

const equipe = [
  {
    nome: 'Weslley Kampa',
    cargo: 'Co-criador & Fundador',
    foto: fotoWeslley,
    descricao: 'Co-fundador da Neon Genesis, apaixonado por tecnologia e inovação, sempre buscando soluções criativas para o mercado.'
  },
  {
    nome: 'Yuri Miguel Naslaniec',
    cargo: 'Co-criador & Fundador',
    foto: FotoYuri,
    descricao: 'Co-fundador da Neon Genesis, responsável pela visão estratégica e pelo desenvolvimento de projetos inovadores.'
  }
];

export default function Sobre() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: { xs: 2, md: 4 },
            mt: { xs: 8, md: 12 },
            mb: 5,
            gap: 4,
            flexDirection: { xs: 'column', md: 'row' },
            boxShadow: '0 2px 16px #a259ff99, 0 0px 32px #a259ff44' // sombra roxa neon
          }}
        >
          <Box flexShrink={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={logo}
              alt="Logo Neon Genesis"
              style={{
                width: 120,
                height: 'auto',
                borderRadius: 16,
                boxShadow: '0 4px 16px #1976d233'
              }}
            />
          </Box>
          <Box>
            <Typography variant="h3" gutterBottom fontWeight={700} color="success.main">
              Sobre a Neon Genesis
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A Neon Genesis nasceu com o propósito de revolucionar o mercado de tecnologia, oferecendo soluções inovadoras e personalizadas para nossos clientes.
            </Typography>
          </Box>
        </Paper>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight={600} color="success.main">
            Nossa Equipe
          </Typography>
          <Grid container spacing={3}>
            {equipe.map((membro, idx) => (
              <Grid item xs={12} sm={6} key={idx} sx={{ display: 'flex' }}>
                <Card
                  elevation={3}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 3,
                    minHeight: 220,
                    height: '100%',
                    flex: 1,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    boxShadow: '0 2px 16px #a259ff99, 0 0px 32px #a259ff44',
                    '&:hover': {
                      transform: 'scale(1.06)',
                      boxShadow: '0 8px 32px #a259ffcc, 0 0px 64px #a259ff88'
                    }
                  }}
                >
                  <Avatar
                    src={membro.foto}
                    sx={{
                      width: 72,
                      height: 72,
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: 32
                    }}
                  >
                    {membro.foto ? null : membro.nome[0]}
                  </Avatar>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={600}>
                      {membro.nome}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {membro.cargo}
                    </Typography>
                    <Typography variant="body2">{membro.descricao}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={4} mb={4}>
          <Typography variant="h5" gutterBottom fontWeight={600} color="success.main">
            História da Empresa
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            A história da Neon Genesis começa com a união de duas mentes brilhantes e apaixonadas por tecnologia: Weslley Kampa e Yuri Miguel Naslaniec. O destino os uniu nos corredores da Unifacear, e logo ficou claro que compartilhavam não apenas interesses, mas uma paixão ardente por inovar e moldar o futuro através da tecnologia.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Aprofundando a amizade e as aspirações, Weslley teve uma experiência transformadora: atuando em uma empresa de totens de autoatendimento, ele presenciou em primeira mão a revolução que essas ferramentas promoviam na experiência do consumidor e o vasto potencial do setor.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Essa visão se alinhou perfeitamente com a expertise de Yuri em administração e negócios. Juntos, perceberam que tinham a combinação ideal para criar algo grandioso. Foi assim que nasceu a Neon Genesis, com a missão de desenvolver soluções tecnológicas personalizadas e de ponta, pautadas pela busca incessante por qualidade, eficiência e um crescimento que beneficiasse a todos.
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h5" gutterBottom fontWeight={600} color="success.main">
            Contato
          </Typography>
          <Typography variant="body2">
            Email: contato@neongenesis.com.br<br />
            Telefone: (41) 99999-9999<br />
            Endereço: Araucária, PR
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}