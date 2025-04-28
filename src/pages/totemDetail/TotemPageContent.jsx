import React from "react";
import TotemDetail from "../../components/totemDetail/TotemDetail";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import totemData from "../../data/totemData";

const TotemPageContent = () => {
  const { id } = useParams(); // Obtém o ID do totem da URL
  const totem = totemData.find((t) => t.id === Number(id)); // Busca os dados do totem pelo ID

  if (!totem) {
    return <p>Totem não encontrado.</p>;
  }

  return (
    <>
      <Header />
      <TotemDetail />
      <ProductOverview text={totem.description} image={totem.image} />
      <ProductSpecs totemId={id} />
    </>
  );
};

export default TotemPageContent;