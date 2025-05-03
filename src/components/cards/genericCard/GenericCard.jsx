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
} from "@mui/material";
import "./GenericCard.css";

/**
 * Componente de Card genérico.
 * Recebe as seguintes props:
 * - image: URL da imagem a ser exibida (opcional)
 * - title: Título do card
 * - description: Descrição do card
 * - buttonText: Texto do botão
 * - link: URL para redirecionar ao clicar no botão
 * - price: Preço do produto (opcional)
 * - type: Tipo do card ("venda" ou "locacao")
 * @param {Object} props - Propriedades do componente
 */
const GenericCard = ({ image, title, description, buttonText, link, price, type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="generic-card">
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            className="generic-card-media"
          />
        )}
        <CardContent className="generic-card-content">
          {title && (
            <Typography variant="h6" component="div" className="card-title">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
          {type === "venda" && price && (
            <Typography variant="h6" color="primary" className="card-price">
              R$ {price.toFixed(2)}
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