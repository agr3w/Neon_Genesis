import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
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
} from "@mui/material";
import "./GenericCard.css";

  import axios from 'axios';


/**
 * Componente de Card genérico.
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.image - URL da imagem a ser exibida (opcional).
 * @param {string} props.title - Título do card.
 * @param {string} props.description - Descrição do card.
 * @param {string} props.buttonText - Texto do botão.
 * @param {string} props.link - URL para redirecionar ao clicar no botão.
 * @param {number} props.price - Preço do produto (opcional).
 * @param {string} props.type - Tipo do card (ex.: "venda", "locacao").
 */
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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`generic-card ${type}`}>
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            className="generic-card-media"
          />
        )}
        <CardContent className="generic-card-content">
          <Box className="card-header">
            {title && (
              <Typography variant="h6" component="div" className="card-title">
                {title}
              </Typography>
            )}
            {type === "venda" && price && (
              <Typography variant="h6" color="primary" className="card-price">
                R$ {price.toFixed(2)}
              </Typography>
            )}
          </Box>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
        <CardActions className="generic-card-actions">
          {buttonText && (
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate(link)}
              className="card-button"
            >
              {buttonText}
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default GenericCard;