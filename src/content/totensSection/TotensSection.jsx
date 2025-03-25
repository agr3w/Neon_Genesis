// src/content/TotensSection.jsx
import { React, useState } from "react";
import GenericCard from "../../components/cards/GenericCard";
import "./TotensSection.css";
import { Box, Grid, TextField } from "@mui/material";

const totensData = [
  {
    image: "https://olg.cc/wp-content/uploads/2015/01/placehold-800x500.jpg",
    title: "Totem 1",
    description: "Texto sobre o Totem 1. Este totem oferece alta performance.",
    buttonText: "Ver Mais",
    onButtonClick: () => console.log("Clique no Totem 1"),
  },
  {
    image: "https://olg.cc/wp-content/uploads/2015/01/placehold-800x500.jpg",
    title: "Totem 2",
    description:
      "Texto sobre o Totem 2. Este totem é voltado para atendimento rápido.",
    buttonText: "Ver Mais",
    onButtonClick: () => console.log("Clique no Totem 2"),
  },
  // Adicione quantos cards precisar
];

const TotensSection = () => {
  const [filter, setFilter] = useState("");
  const filteredTotens = totensData.filter((totem) =>
    totem.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="totens-section">
      <h2>Nossos Totens</h2>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Buscar totem"
          variant="outlined"
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
        />
      </Box>
      <Grid container spacing={3} justifyContent={"center"}>
        {filteredTotens.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <GenericCard {...item} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
export default TotensSection;
