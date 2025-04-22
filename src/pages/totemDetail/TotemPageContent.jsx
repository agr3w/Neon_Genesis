// src/content/TotemPageContent.jsx
import React from "react";
import Header from "../../components/header/Header";
import TotemDetail from "../../components/totemDetail/TotemDetail";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";
import specsData from "../../data/specsData";

const TotemPageContent = () => (
    <>
        <Header />
        <TotemDetail />
        <ProductOverview
            text="Este totem é usado para autoatendimento em pontos de venda, controle de acesso e consulta de informações."
            image="https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png"
        />
        <ProductSpecs specs={specsData} />
    </>
);

export default TotemPageContent;
