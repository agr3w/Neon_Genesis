import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import TotensListPage from "../../content/totensList/TotensListPage";

const TotensListRender = () => {
  return (
    <>
      <Header />
      <TotensListPage />
      <Footer />
    </>
  );
};

export default TotensListRender;