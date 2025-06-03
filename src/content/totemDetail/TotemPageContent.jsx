import React from "react";
import { useParams } from "react-router-dom";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";
import totemData from "../../data/totemData";
import TotemDetail from "../../components/totemDetail/TotemDetail";

const TotemDetailContent = () => {
  const { id } = useParams();
  const totem = totemData.find((t) => t.id === Number(id));

  if (!totem) {
    return <p>Totem não encontrado.</p>;
  }

  return (
    <>
      <TotemDetail totemData={totem} type={totem.type} />
      <ProductOverview title={totem.name} text={totem.description} image={totem.image} />
      <ProductSpecs totemId={id} />
    </>
  );
};

export default TotemDetailContent;