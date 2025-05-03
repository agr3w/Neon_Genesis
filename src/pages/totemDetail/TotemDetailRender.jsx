import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import TotemDetailContent from "../../content/totemDetail/TotemPageContent";

const TotemDetailRender = () => {
  return (
    <>
      <Header />
      <TotemDetailContent />
      <Footer />
    </>
  );
};

export default TotemDetailRender;