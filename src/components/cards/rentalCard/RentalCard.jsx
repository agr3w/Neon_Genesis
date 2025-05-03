import React from "react";
import GenericCard from "../genericCard/GenericCard";
/**
 * Componente para exibir cards de locação.
 * @param {Object} props - Propriedades do componente.
 * @param {Object} props.totem - Dados do totem.
 */
const RentalCard = ({ totem }) => {
  return (
    <GenericCard
      image={totem.image}
      title={totem.name}
      description={totem.description}
      buttonText="Fazer uma Cotação"
      link={`/locacao/${totem.id}`}
      price={totem.price}
    />
  );
};

export default RentalCard;
