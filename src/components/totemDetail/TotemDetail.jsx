// src/pages/TotemDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import "./TotemDetail.css";

const allTotems = [
    {
        id: 1,
        name: "Totem Ultra Pro",
        price: 2999.99,
        description:
            "O Totem Ultra Pro oferece alta performance e um design moderno, perfeito para agilizar o atendimento no seu negócio.",
        mainImage: "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
        gallery: [
            "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
            "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
            "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
        ],
    },
    {
        id: 2,
        name: "Totem Express",
        price: 1999.99,
        description:
            "O Totem Express é compacto e rápido, ideal para pontos de alto fluxo.",
        mainImage: "https://via.placeholder.com/600x400?text=Totem+Express",
        gallery: [
            "https://via.placeholder.com/200x150?text=Express+1",
            "https://via.placeholder.com/200x150?text=Express+2",
        ],
    },
    // … demais totems
];

const TotemDetail = () => {
    const { id } = useParams();
    const totemData = allTotems.find((t) => t.id === Number(id));

    // Se não encontrar, você pode renderizar uma mensagem de erro:
    if (!totemData) {
        return (
            <>
                <Box className="totem-detail-container">
                    <Typography variant="h5" align="center">
                        Totem não encontrado.
                    </Typography>
                </Box>
            </>
        );
    }

    const handleAddToCart = () => {
        console.log(`Totem ${totemData.name} adicionado ao carrinho!`);
        // integrate com seu carrinho aqui
    };

    return (
        <>
            <Box className="totem-detail-container">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box className="image-container">
                            <img
                                src={totemData.mainImage}
                                alt={totemData.name}
                                className="totem-main-image"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className="totem-info">
                            <Typography variant="h4" component="h1" gutterBottom>
                                {totemData.name}
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom>
                                R$ {totemData.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {totemData.description}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                            >
                                Adicionar ao Carrinho
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default TotemDetail;
