import React from 'react';
import Footer from '../../components/Footer/Footer'; 
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';

const equipe = [
  {
    nome: 'Weslley Kampa',
    cargo: 'Co-criador & Fundador',
    foto: '',
    descricao: 'Co-fundador da Neon Genesis, apaixonado por tecnologia e inovação, sempre buscando soluções criativas para o mercado.'
  },
  {
    nome: 'Yuri Miguel Naslaniec',
    cargo: 'Co-criador & Fundador',
    foto: '',
    descricao: 'Co-fundador da Neon Genesis, responsável pela visão estratégica e pelo desenvolvimento de projetos inovadores.'
  }
];

export default function Sobre() {
  return (
    <>
      <Container maxWidth="md">
        <Box mt={5} mb={5}>
          <Typography variant="h3" gutterBottom>
            Sobre a Neon Genesis!
          </Typography>
          <Typography variant="body1" paragraph>
            A Neon Genesis nasceu com o propósito de revolucionar o mercado de tecnologia, oferecendo soluções inovadoras e personalizadas para nossos clientes.
          </Typography>
          <Box mb={4}>
            <Typography variant="h5" gutterBottom>Nossa Equipe</Typography>
            <Grid container spacing={2}>
              {equipe.map((membro, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Card>
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                      <Avatar src={membro.foto} sx={{ width: 64, height: 64, mb: 1 }} />
                      <CardContent>
                        <Typography variant="h6">{membro.nome}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">{membro.cargo}</Typography>
                        <Typography variant="body2" mt={1}>{membro.descricao}</Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Sobre a Neon Genesis */}
          <Box mt={4} mb={4}>
            <Typography variant="h5" gutterBottom>História da Empresa</Typography>
            <Typography variant="body2" paragraph>
              A história da Neon Genesis começa com a união de duas mentes brilhantes e apaixonadas por tecnologia: Weslley Kampa e Yuri Miguel Naslaniec. O destino os uniu nos corredores da Unifacear, e logo ficou claro que compartilhavam não apenas interesses, mas uma paixão ardente por inovar e moldar o futuro através da tecnologia.
            </Typography>
            <Typography variant="body2" paragraph>
              Aprofundando a amizade e as aspirações, Weslley teve uma experiência transformadora: atuando em uma empresa de totens de autoatendimento, ele presenciou em primeira mão a revolução que essas ferramentas promoviam na experiência do consumidor e o vasto potencial do setor.
            </Typography>
            <Typography variant="body2" paragraph>
              Essa visão se alinhou perfeitamente com a expertise de Yuri em administração e negócios. Juntos, perceberam que tinham a combinação ideal para criar algo grandioso. Foi assim que nasceu a Neon Genesis, com a missão de desenvolver soluções tecnológicas personalizadas e de ponta, pautadas pela busca incessante por qualidade, eficiência e um crescimento que beneficiasse a todos.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h5" gutterBottom>Contato</Typography>
            <Typography variant="body2">
              Email: contato@neongenesis.com.br<br />
              Telefone: (41) 99999-9999<br />
              Endereço: Araucária, PR
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
