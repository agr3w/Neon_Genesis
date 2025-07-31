import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Divider, Chip } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import CodeIcon from '@mui/icons-material/Code';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

// Importe as imagens relacionadas aos serviços
import locImg from '../../assets/LOC.png';
import idiImg from '../../assets/IDI.png';
import consuImg from '../../assets/Consu.png';
import sptImg from '../../assets/SPT.png';

const servicos = [
  {
    titulo: 'Locação de Totens Interativos',
    descricao: 'Totens de autoatendimento modernos e personalizados para eventos, feiras, lojas e empresas. Proporcione praticidade, inovação e uma experiência diferenciada ao seu público.',
    icone: <DevicesIcon color="primary" sx={{ fontSize: 40 }} />,
    imagem: locImg
  },
  {
    titulo: 'Desenvolvimento de Software Sob Medida',
    descricao: 'Soluções digitais personalizadas para atender às necessidades do seu negócio: sistemas de gestão, aplicativos, integrações e muito mais.',
    icone: <CodeIcon color="primary" sx={{ fontSize: 40 }} />,
    imagem: idiImg
  },
  {
    titulo: 'Consultoria em Tecnologia',
    descricao: 'Identificamos oportunidades de inovação, otimizamos processos e implementamos as melhores tecnologias para o seu crescimento.',
    icone: <TipsAndUpdatesIcon color="primary" sx={{ fontSize: 40 }} />,
    imagem: consuImg
  },
  {
    titulo: 'Suporte Técnico Especializado',
    descricao: 'Equipe pronta para oferecer suporte técnico rápido e eficiente, garantindo o funcionamento contínuo das soluções implementadas.',
    icone: <SupportAgentIcon color="primary" sx={{ fontSize: 40 }} />,
    imagem: sptImg
  }
];

const diferenciais = [
  "Equipe experiente e apaixonada por tecnologia",
  "Atendimento personalizado e soluções sob medida",
  "Foco em inovação, eficiência e resultados",
  "Suporte ágil e acompanhamento pós-venda"
];

export default function Servicos() {
  return (
    <>
      <Header />
<Container maxWidth="md">
  <Box mt={12} mb={4} textAlign="center">
    <Typography variant="h3" gutterBottom fontWeight={700} color="success.main">
      Nossos Serviços
    </Typography>
    <Typography variant="h6" color="text.secondary" mb={2}>
      Soluções inovadoras para transformar o seu negócio
    </Typography>
    <Typography variant="body1" paragraph>
      A Neon Genesis oferece um portfólio completo de serviços em tecnologia, desde a locação de totens interativos até o desenvolvimento de sistemas personalizados. Nosso objetivo é impulsionar sua empresa com inovação, eficiência e atendimento de excelência.
    </Typography>
  </Box>

        <Grid container spacing={4} mb={4}>
          {servicos.map((servico, idx) => (
            <Grid item xs={12} sm={6} key={idx} sx={{ display: 'flex' }}>
              <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3, flex: 1, minHeight: 370 }}>
                <img
                  src={servico.imagem}
                  alt={servico.titulo}
                  style={{
                    width: 101,
                    height: 101,
                    objectFit: 'contain',
                    marginBottom: 12,
                    borderRadius: 12
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom align="center" color="success.main">
                    {servico.titulo}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {servico.descricao}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }}>
          <Chip
            label={
              <Typography variant="h6" fontWeight={700} color="success.main">
                Por que escolher a Neon Genesis?
              </Typography>
            }
            color="primary"
            sx={{ px: 2, py: 2 }}
          />
        </Divider>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom color="success.main">
            Nossos Diferenciais
          </Typography>
          <Grid container spacing={2}>
            {diferenciais.map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#1976d2', fontWeight: 'bold', marginRight: 8 }}>•</span> {item}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box textAlign="center" mb={6}>
          <Typography variant="h6" gutterBottom color="success.main">
            Ficou interessado? Fale com a gente!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="mailto:contato@neongenesis.com.br"
            sx={{ mt: 2 }}
          >
            Solicitar Orçamento
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}