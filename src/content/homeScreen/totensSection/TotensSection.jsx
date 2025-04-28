import React from "react";
import GenericCard from "../../../components/cards/GenericCard";
import "./TotensSection.css";
import { useNavigate } from "react-router-dom";
import totensCardData from "../../../data/totensCardData";

const TotensSection = () => {
  const navigate = useNavigate();

  return (
    <section className="totens-section">
      <h2>Nossos Totens</h2>
      <div className="cards-wrapper">
        {totensCardData.map((item) => (
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