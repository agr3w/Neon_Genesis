import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import TotemDetail from "../../components/totemDetail/TotemDetail";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";
import totemData from "../../data/totemData";

const TotemPageContent = ({ type = "venda" }) => {
  const { id } = useParams();
  const totem = totemData.find((t) => t.id === Number(id));

  if (!totem) {
    return <p>Totem não encontrado.</p>;
  }

  return (
    <>
      <Header />
      <TotemDetail totemData={totem} type={type} />
      <ProductOverview text={totem.description} image={totem.image} />
      <ProductSpecs totemId={id} />
    </>
  );
};

export default TotemPageContent;