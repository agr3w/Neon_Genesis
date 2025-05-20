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
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s',
  boxShadow: `0 5px 15px ${type === 'locacao' ? 'rgba(125, 38, 205, 0.3)' : 'rgba(255, 0, 51, 0.3)'}`,
  '&:hover': {
    borderColor: theme.palette.nge.neonGreen,
    boxShadow: `0 10px 25px rgba(0, 255, 157, 0.5)`
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
              height: 200,
              objectFit: 'contain',
              p: 2,
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))'
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
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
            {type === "venda" && price && (
              <Typography 
                variant="h6"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: theme.palette.nge.red
                }}
              >
                R$ {price.toFixed(2)}
              </Typography>
            )}
          </Box>
          {description && (
            <Typography 
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '0.9rem'
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          {buttonText && (
            <NervCardButton
              size="small"
              fullWidth
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