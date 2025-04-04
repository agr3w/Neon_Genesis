// src/content/TotensSection.jsx
import React from "react";
import GenericCard from "../../components/cards/GenericCard";
import "./TotensSection.css";
import totemImg from "../../assets/teste.png";

const totensData = [
  {
    image: totemImg,
    title: "Totem 1",
    description: "Texto sobre o Totem 1. Este totem oferece alta performance.",
    buttonText: "Ver Mais",
    onButtonClick: () => console.log("Clique no Totem 1"),
  },
  {
    image: totemImg,
    title: "Totem 2",
    description:
      "Texto sobre o Totem 2. Este totem é voltado para atendimento rápido.",

    buttonText: "Ver Mais",
    onButtonClick: () => console.log("Clique no Totem 2"),
  },
  // Adicione quantos cards precisar
];

const TotensSection = () => {
  return (
    <section className="totens-section">
      <h2>Nossos Totens</h2>
      <div className="cards-wrapper">
        {totensData.map((item, idx) => (
          <GenericCard
            key={idx}
            image={item.image}
            title={item.title}
            description={item.description}
            buttonText={item.buttonText}
            onButtonClick={item.onButtonClick}
          />
        ))}
      </div>
    </section>
  );
};

export default TotensSection;
