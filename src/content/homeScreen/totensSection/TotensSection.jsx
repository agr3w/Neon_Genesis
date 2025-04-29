import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import style from "./TotensSection.module.css";
import totensCardData from "../../../data/totensCardData";
import { useNavigate } from "react-router-dom";

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
        {totensCardData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className={style.totemCard}
              onClick={() => navigate(`/totem/${item.id}`)}
            >
              <img
                src={item.image}
                alt={item.title}
                className={style.totemImage}
              />
              <h3 className={style.totemTitle}>{item.title}</h3>
              <p className={style.totemDescription}>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TotensSection;