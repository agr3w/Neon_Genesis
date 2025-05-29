import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Button, Divider, Chip } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import CodeIcon from '@mui/icons-material/Code';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Footer from '../../components/Footer/Footer';

const servicos = [
  {
    titulo: 'Locação de Totens Interativos',
    descricao: 'Totens de autoatendimento modernos e personalizados para eventos, feiras, lojas e empresas. Proporcione praticidade, inovação e uma experiência diferenciada ao seu público.',
    icone: <DevicesIcon color="primary" sx={{ fontSize: 40 }} />
  },
  {
    titulo: 'Desenvolvimento de Software Sob Medida',
    descricao: 'Soluções digitais personalizadas para atender às necessidades do seu negócio: sistemas de gestão, aplicativos, integrações e muito mais.',
    icone: <CodeIcon color="primary" sx={{ fontSize: 40 }} />
  },
  {
    titulo: 'Consultoria em Tecnologia',
    descricao: 'Identificamos oportunidades de inovação, otimizamos processos e implementamos as melhores tecnologias para o seu crescimento.',
    icone: <TipsAndUpdatesIcon color="primary" sx={{ fontSize: 40 }} />
  },
  {
    titulo: 'Suporte Técnico Especializado',
    descricao: 'Equipe pronta para oferecer suporte técnico rápido e eficiente, garantindo o funcionamento contínuo das soluções implementadas.',
    icone: <SupportAgentIcon color="primary" sx={{ fontSize: 40 }} />
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
      <Container maxWidth="md">
        <Box mt={6} mb={4} textAlign="center">
          <Typography variant="h3" gutterBottom fontWeight={700}>
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
            <Grid item xs={12} sm={6} key={idx}>
              <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2 }}>
                  {servico.icone}
                </Avatar>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom align="center">
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
          <Chip label="Por que escolher a Neon Genesis?" color="primary" />
        </Divider>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Nossos Diferenciais
          </Typography>
          <Grid container spacing={2}>
            {diferenciais.map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#1976d2', fontWeight: 'bold', marginRight: 8 }}>•</span> {item}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box textAlign="center" mb={6}>
          <Typography variant="h6" gutterBottom>
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