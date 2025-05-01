import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import style from "./TotensSection.module.css";
import { useNavigate } from "react-router-dom";
import totensData from "../../../data/totemData";
import { Typography } from "@mui/material";

const TotensSection = () => {
  const navigate = useNavigate();

  return (
    <section className={style.totensSection}>
      <h2>Nossos Totens</h2>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        navigation
        effect="coverflow"
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50, // Rotação dos slides laterais
          stretch: 0, // Distância entre os slides
          depth: 100, // Profundidade dos slides
          modifier: 1, // Intensidade do efeito
          slideShadows: false, // Desativa sombras nos slides
        }}
        breakpoints={{
          640: { slidesPerView: 1 }, // Em telas menores, exibe apenas 1 slide
          1024: { slidesPerView: 3 }, // Em telas maiores, exibe 3 slides
        }}
      >
        {totensData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className={style.totemCard}
              onClick={() => navigate(`/totem/${item.id}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className={style.totemImage}
              />
              <Typography variant="h5" fontSize={"1.4rem"}>
                {item.name}
              </Typography>
              <Typography variant="h6" fontSize={"0.9rem"}>
                {item.description}
              </Typography>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TotensSection;
