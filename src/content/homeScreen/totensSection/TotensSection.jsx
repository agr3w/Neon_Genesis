// src/content/TotensSection.jsx
import React from "react";
import GenericCard from "../../../components/cards/GenericCard";
import "./TotensSection.css";
import { useNavigate } from "react-router-dom";

const totensData = [
  {
    id: 1,
    image: "https://olg.cc/wp-content/uploads/2015/01/placehold-800x500.jpg",
    title: "Totem 1",
    description: "Este totem oferece alta performance.",
  },
  {
    id: 2,
    image: "https://olg.cc/wp-content/uploads/2015/01/placehold-800x500.jpg",
    title: "Totem 2",
    description: "Este totem é voltado para atendimento rápido.",
  },
  // Adicione quantos cards precisar
];

const TotensSection = () => {
  const navigate = useNavigate();

  return (
    <section className="totens-section">
      <h2>Nossos Totens</h2>
      <div className="cards-wrapper">
        {totensData.map((item) => (
          <GenericCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            buttonText="Ver Mais"
            onButtonClick={() => navigate(`/totem/${item.id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TotensSection;
