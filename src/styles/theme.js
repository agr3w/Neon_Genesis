// src/theme.js
import { createTheme, styled } from '@mui/material/styles';

const nervTheme = createTheme({
  palette: {
    mode: 'dark', // Base escura para o tema NGE
    nge: { // Cores customizadas
      dark: '#0a0a12',
      red: '#ff0033',
      purple: '#7d26cd',
      neonGreen: '#00ff9d',
      hoverBlue: '#00a1ff',
      orange: '#ff6600'
    },
    background: {
      default: '#0a0a12', // Cor de fundo padrão
      paper: '#1a1a2e' // Cor de fundo de componentes como Paper/Card
    }
  },
  typography: {
    fontFamily: [
      '"Orbitron"',
      '"Rajdhani"',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 700,
      letterSpacing: '0.05em'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 255, 157, 0.3)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: '0.05em'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s, box-shadow 0.3s'
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'filter 0.3s'
        }
      }
    },
  }
});

//Containers de estilização


// ---------Estilos para os componentes de card e carrousel ----------------
export const NervTotemCard = styled('div')(({ theme }) => ({
  background: 'linear-gradient(145deg, #1a1a2e, #0a0a12)',
  margin: '20px',
  borderRadius: '10px',
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.4s',
  border: `1px solid ${theme.palette.nge.purple}`,
  boxShadow: `0 5px 15px rgba(125, 38, 205, 0.3)`,
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 15px 30px rgba(0, 255, 157, 0.5)`,
    borderColor: theme.palette.nge.neonGreen,
    '& h5': {
      color: theme.palette.nge.neonGreen
    }
  }
}));

export const NervCarouselButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '55%',
  zIndex: 10,
  width: '50px',
  height: '50px',
  transform: 'translateY(-50%)',
  background: 'rgba(10, 10, 18, 0.7)',
  border: `2px solid ${theme.palette.nge.neonGreen}`,
  borderRadius: '50%',
  color: theme.palette.nge.neonGreen,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    background: theme.palette.nge.red,
    color: theme.palette.nge.dark,
    boxShadow: `0 0 15px ${theme.palette.nge.neonGreen}`
  }
}));

export default nervTheme;