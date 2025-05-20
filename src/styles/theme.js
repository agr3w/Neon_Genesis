// src/theme.js
import { createTheme } from '@mui/material/styles';

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

export default nervTheme;