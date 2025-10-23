import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  styled
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NervCard = styled(Card)(({ theme, type }) => ({
  background: `linear-gradient(145deg, #1a1a2e, #0a0a12)`,
  border: `2px solid ${type === 'locacao' ? theme.palette.nge.purple : theme.palette.nge.red}`,
  borderRadius: '4px',
  width: 340,
  maxWidth: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  height: 420,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s',
  boxShadow: `0 5px 15px ${type === 'locacao' ? 'rgba(125, 38, 205, 0.3)' : 'rgba(255, 0, 51, 0.3)'}`,
  '&:hover': {
    borderColor: theme.palette.nge.neonGreen,
    boxShadow: `0 10px 25px rgba(0, 255, 157, 0.5)`
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 340,
    maxWidth: '100%',
    minWidth: 0
  }
}));

const NervCardButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  background: 'linear-gradient(45deg, #7d26cd 0%, #ff0033 100%)',
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  borderRadius: '0',
  padding: '8px 16px',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff0033 0%, #7d26cd 100%)'
  }
}));

const GenericCard = ({
  image,
  title,
  description,
  buttonText,
  link,
  price,
  type,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      data-aos="fade-up"
    >
      <NervCard type={type} sx={{
        border: `2px solid ${type === 'locacao' ? theme.palette.nge.purple : theme.palette.nge.red}`,
        boxShadow: `0 5px 15px ${type === 'locacao' ? 'rgba(125, 38, 205, 0.3)' : 'rgba(255, 0, 51, 0.3)'}`,
        '&:hover': {
          borderColor: theme.palette.nge.neonGreen,
          boxShadow: `0 10px 25px rgba(0, 255, 157, 0.5)`
        }
      }}>
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              height: 160, // fixo para manter consistência com a altura total
              objectFit: 'contain',
              p: 2,
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))'
            }}
          />
        )}
        <CardContent sx={{
          flexGrow: 1,
          minHeight: 120,
          overflow: 'hidden',
          boxSizing: 'border-box',
          pb: { xs: 1, sm: 2 } // Reduz o padding-bottom no mobile
        }}>          <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          minHeight: 32
        }}>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: theme.palette.nge.neonGreen,
                  fontWeight: 700
                }}
              >
                {title}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.red,
                minWidth: 80,
                textAlign: "right"
              }}
            >
              {type === "venda" && price ? `R$ ${price.toFixed(2)}` : "\u00A0"}
            </Typography>
          </Box>
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '0.9rem',
                // truncar para manter cards com mesma altura visual
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            p: { xs: 0, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%',
            alignItems: 'stretch',
            mt: { xs: 0, sm: 1 }
          }}
        >
          {buttonText && (
            <NervCardButton
              size="small"
              fullWidth
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem' },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 0,
                mt: { xs: 1, sm: 0 }
              }}
              onClick={() => navigate(link)}
            >
              {buttonText}
            </NervCardButton>
          )}
        </CardActions>
      </NervCard>
    </motion.div>
  );
};

export default GenericCard;